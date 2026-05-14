package recomendador.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import recomendador.model.Genero;
import recomendador.repository.GeneroRepository;

import java.util.List;

@CrossOrigin(origins = "*")
// Controlador REST para géneros
@RestController
@RequestMapping("/generos")
public class GeneroController {

    @Autowired
    private GeneroRepository generoRepository;

    // Crear género
    @PostMapping
    public Genero crearGenero(@RequestBody Genero genero) {
        return generoRepository.save(genero);
    }

    // Listar géneros
    @GetMapping
    public List<Genero> listarGeneros() {
        return generoRepository.findAll();
    }
}
