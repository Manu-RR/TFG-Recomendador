package recomendador.controller;

import recomendador.model.ListaJuego;
import recomendador.repository.ListaJuegoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/lista")
public class ListaJuegoController {

	@Autowired
	private ListaJuegoRepository repository;

	@PostMapping
	public ListaJuego guardarJuego(

			@RequestBody ListaJuego juego

	) {

		Optional<ListaJuego> existente =

				repository.findByUsuarioIdAndJuegoId(

						juego.getUsuario().getId(), juego.getJuegoId()

				);

		// SI YA EXISTE → ACTUALIZAR

		if (existente.isPresent()) {

			ListaJuego juegoExistente = existente.get();

			juegoExistente.setEstado(juego.getEstado());

			return repository.save(juegoExistente);

		}

		// SI NO EXISTE → CREAR NUEVO

		return repository.save(juego);

	}

	@GetMapping("/{usuarioId}")
	public List<ListaJuego> obtener(@PathVariable Long usuarioId) {

		return repository.findByUsuarioId(usuarioId);

	}

	@DeleteMapping("/{id}")
	public void eliminar(@PathVariable Long id) {

		repository.deleteById(id);

	}
}
