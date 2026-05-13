package recomendador.controller;

import recomendador.model.Resena;
import recomendador.repository.ResenaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;

import java.util.List;

@RestController
@RequestMapping("/resenas")
@CrossOrigin("*")
public class ResenaController {

	@Autowired
	private ResenaRepository repository;

	@PostMapping
	public Resena crearResena(@RequestBody Resena resena) {

		resena.setFecha(LocalDateTime.now());

		return repository.save(resena);

	}

	@GetMapping("/{juegoId}")
	public List<Resena> obtenerResenas(@PathVariable Long juegoId) {

		return repository.findByJuegoId(juegoId);

	}

	@DeleteMapping("/{id}")
	public void eliminarResena(@PathVariable Long id) {

		repository.deleteById(id);

	}
}
