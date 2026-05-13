package recomendador.controller;

import recomendador.model.Favorito;

//Importamos la entidad Usuario
import recomendador.model.Usuario;
import recomendador.repository.FavoritoRepository;
import recomendador.repository.ListaJuegoRepository;
//Importamos el repositorio para acceder a la base de datos
import recomendador.repository.UsuarioRepository;

//Importaciones necesarias para Spring
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;


//Indicamos que esta clase es un controlador REST (API)
@RestController

//Ruta base de este controlador
@RequestMapping("/usuarios")
public class UsuarioController {

	// Inyectamos el repositorio automáticamente
	@Autowired
	private UsuarioRepository usuarioRepository;

	@Autowired
	private FavoritoRepository favoritoRepository;

	@Autowired
	private ListaJuegoRepository listaRepository;

	// ===== CREAR USUARIO =====
	@PostMapping
	public Usuario crearUsuario(@Valid @RequestBody Usuario usuario) {
		// Guarda el usuario en la base de datos y lo devuelve
		return usuarioRepository.save(usuario);
	}

	@GetMapping("/email/{email}")
	public Usuario obtenerPorEmail(@PathVariable String email) {

		return usuarioRepository.findByEmail(email).orElse(null);

	}

	@GetMapping("/{id}")
	public Usuario obtenerUsuario(@PathVariable Long id) {

		return usuarioRepository.findById(id).orElseThrow();
	}

	@PostMapping("/registro")
	public Usuario registrarUsuario(@RequestBody Usuario usuario) {

	    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

	    usuario.setPassword(
	        encoder.encode(usuario.getPassword())
	    );

	    usuario.setRol("ADMIN");

	    return usuarioRepository.save(usuario);
	}

	@PostMapping("/login")
	public Usuario login(@RequestBody Usuario loginRequest) {

	    Optional<Usuario> optionalUsuario =
	            usuarioRepository.findByEmail(loginRequest.getEmail());

	    if (optionalUsuario.isPresent()) {

	        BCryptPasswordEncoder encoder =
	                new BCryptPasswordEncoder();

	        if (encoder.matches(
	                loginRequest.getPassword(),
	                optionalUsuario.get().getPassword())) {

	            return optionalUsuario.get();
	        }
	    }

	    throw new RuntimeException("Credenciales incorrectas");
	}

	@PutMapping("/{id}")
	public Usuario actualizarUsuario(@PathVariable Long id, @RequestBody Usuario datos) {

		Usuario usuario = usuarioRepository.findById(id).orElseThrow();

		usuario.setNombre(datos.getNombre());

		usuario.setEmail(datos.getEmail());

		usuario.setAvatar(datos.getAvatar());

		// SOLO CAMBIAR PASSWORD SI VIENE
		if (datos.getPassword() != null && !datos.getPassword().isEmpty()) {

			usuario.setPassword(datos.getPassword());

		}

		return usuarioRepository.save(usuario);

	}

	@GetMapping
	public List<Map<String, Object>> obtenerUsuarios() {

		List<Usuario> usuarios = usuarioRepository.findAll();

		List<Map<String, Object>> resultado = new ArrayList<>();

		for (Usuario usuario : usuarios) {

			Map<String, Object> data = new HashMap<>();

			data.put("id", usuario.getId());

			data.put("nombre", usuario.getNombre());

			data.put("email", usuario.getEmail());

			data.put("rol", usuario.getRol());

			data.put("avatar", usuario.getAvatar());

			data.put("favoritos", favoritoRepository.countByUsuarioId(usuario.getId()));

			resultado.add(data);
		}

		return resultado;
	}

	@SuppressWarnings("unused")
	@GetMapping("/stats")
	public Map<String, Object> obtenerStats() {

		long totalUsuarios = usuarioRepository.count();

		long totalAdmins = usuarioRepository.findAll().stream().filter(usuario -> usuario.getRol().equals("ADMIN"))
				.count();

		long totalFavoritos = favoritoRepository.count();
		List<Favorito> favoritos = favoritoRepository.findAll();

		String juegoPopular = "Ninguno";

		if (!favoritos.isEmpty()) {

			juegoPopular = favoritos.stream()
					.collect(Collectors.groupingBy(Favorito::getNombreJuego, Collectors.counting())).entrySet().stream()
					.max(Map.Entry.comparingByValue()).get().getKey();
		}

		Map<String, Object> stats = new HashMap<>();

		stats.put("usuarios", totalUsuarios);

		stats.put("admins", totalAdmins);
		stats.put("favoritos", totalFavoritos);
		stats.put("juegoPopular", 0L);

		return stats;
	}

	@GetMapping("/{id}/perfil")
	public Map<String, Object> obtenerPerfil(@PathVariable Long id) {

		Usuario usuario =

				usuarioRepository.findById(id).orElseThrow();

		Map<String, Object> perfil = new HashMap<>();

		perfil.put("usuario", usuario);

		perfil.put("jugando",

				listaRepository.countByUsuarioIdAndEstado(id, "JUGANDO"));

		perfil.put("completados",

				listaRepository.countByUsuarioIdAndEstado(id, "COMPLETADO"));

		perfil.put("pendientes",

				listaRepository.countByUsuarioIdAndEstado(id, "PENDIENTE"));

		perfil.put("lista",

				listaRepository.findByUsuarioId(id));

		return perfil;
	}

	@PutMapping("/{id}/perfil")
	public Usuario editarPerfil(@PathVariable Long id, @RequestBody Usuario datos) {

		Usuario usuario = usuarioRepository.findById(id).orElseThrow();

		usuario.setNombre(datos.getNombre());

		usuario.setAvatar(datos.getAvatar());

		// SOLO SI VIENE PASSWORD

		if (datos.getPassword() != null && !datos.getPassword().isEmpty()) {

			usuario.setPassword(datos.getPassword());

		}

		return usuarioRepository.save(usuario);

	}

	@DeleteMapping("/{id}")
	public void eliminarUsuario(@PathVariable Long id, @RequestHeader("rol") String rol) {

		if (!rol.equals("ADMIN")) {

			throw new RuntimeException("No autorizado");
		}

		usuarioRepository.deleteById(id);
	}
}