package recomendador.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import recomendador.model.Genero;
import recomendador.model.Usuario;
import recomendador.model.Videojuego;
import recomendador.repository.GeneroRepository;
import recomendador.repository.VideojuegoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import recomendador.repository.UsuarioRepository;
import java.util.List;
import java.util.ArrayList;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/videojuegos")
public class VideojuegoController {

    @Autowired
    private VideojuegoRepository videojuegoRepository;

    @Autowired
    private GeneroRepository generoRepository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    // ===== CREAR VIDEOJUEGO (PROTEGIDO) =====
    // Solo ADMIN puede crear videojuegos
    @PostMapping
    public ResponseEntity<?> crearVideojuego(
            @RequestBody Videojuego videojuego,
            @RequestHeader("Authorization") String token) {

        // Buscar usuario por token
        Usuario usuario = usuarioRepository.findByToken(token).orElse(null);

        // Si no existe → no autenticado
        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Token inválido");
        }

        // Si no es ADMIN → prohibido
        if (!usuario.getRol().equals("ADMIN")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("No tienes permisos");
        }

        // Crear videojuego
        return ResponseEntity.ok(videojuegoRepository.save(videojuego));
    }

    // ===== LISTAR VIDEOJUEGOS =====
    @GetMapping
    public List<Videojuego> listarVideojuegos() {
        return videojuegoRepository.findAll();
    }

    // ===== ASIGNAR GÉNERO A VIDEOJUEGO =====
    @PostMapping("/{videojuegoId}/generos/{generoId}")
    public Videojuego asignarGenero(
            @PathVariable Long videojuegoId,
            @PathVariable Long generoId) {

        // Buscar videojuego
        Videojuego videojuego = videojuegoRepository.findById(videojuegoId).orElse(null);

        // Buscar género
        Genero genero = generoRepository.findById(generoId).orElse(null);

        // Si alguno no existe
        if (videojuego == null || genero == null) {
            return null;
        }

        // Inicializar lista si es null
        if (videojuego.getGeneros() == null) {
            videojuego.setGeneros(new ArrayList<>());
        }

        // Añadir género
        videojuego.getGeneros().add(genero);

        // Guardar cambios
        return videojuegoRepository.save(videojuego);
    }
}
