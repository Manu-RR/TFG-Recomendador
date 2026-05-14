package recomendador.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import recomendador.model.Favorito;
import recomendador.model.ListaJuego;
import recomendador.repository.FavoritoRepository;
import recomendador.repository.ListaJuegoRepository;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@CrossOrigin(origins = "*")
@RestController

@RequestMapping("/recomendaciones")
public class RecomendacionController {

	private final String API_KEY = "36198b2a8c6642ceb5cfdedcdbb37bf4";

	@Autowired
	private FavoritoRepository favoritoRepository;

	@Autowired
	private ListaJuegoRepository listaJuegoRepository;

	@GetMapping("/{usuarioId}")
	public Object recomendar(@PathVariable Long usuarioId) {

		List<Favorito> favoritos = favoritoRepository.findByUsuarioId(usuarioId);

		List<ListaJuego> lista = listaJuegoRepository.findByUsuarioId(usuarioId);

		Map<String, Integer> generos = new HashMap<>();

		// ANALISIS SIMPLE

		favoritos.forEach(f -> {

			sumarGenero(generos, "action");
			sumarGenero(generos, "rpg");

		});

		lista.forEach(j -> {

			sumarGenero(generos, "adventure");

		});

		// SI NO HAY DATOS
		
		if (generos.isEmpty()) {

			sumarGenero(generos, "action");
			sumarGenero(generos, "adventure");

		}

		// TOP GENEROS

		List<String> topGeneros = generos.entrySet().stream().sorted((a, b) -> b.getValue() - a.getValue()).limit(2)
				.map(Map.Entry::getKey).toList();

		String genresQuery = String.join(",", topGeneros);

		// LLAMADA RAWG

		String url = "https://api.rawg.io/api/games" + "?key=" + API_KEY + "&genres=" + genresQuery + "&page_size=3";

		RestTemplate restTemplate = new RestTemplate();

		return restTemplate.getForObject(url, Object.class);
	}

	private void sumarGenero(Map<String, Integer> mapa, String genero) {

		mapa.put(genero, mapa.getOrDefault(genero, 0) + 1);
	}
}
