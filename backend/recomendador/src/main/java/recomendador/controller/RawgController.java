package recomendador.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/rawg")
public class RawgController {

	// URL base de RAWG
	private final String BASE_URL = "https://api.rawg.io/api";

	// TU API KEY
	private final String API_KEY = "36198b2a8c6642ceb5cfdedcdbb37bf4";

	// Cliente HTTP
	private final WebClient webClient = WebClient.builder().baseUrl(BASE_URL)
			.codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(16 * 1024 * 1024)).build();

	// Obtener lista de juegos
	@GetMapping("/juegos")
	public String obtenerJuegos() {

		return webClient.get().uri("/games?page_size=40&key=" + API_KEY).retrieve().bodyToMono(String.class).block();
	}

	@GetMapping("/juego/{id}/screenshots")
	public String obtenerScreenshots(@PathVariable Long id) {

		String url = "https://api.rawg.io/api/games/" + id + "/screenshots?key=" + API_KEY;

		RestTemplate restTemplate = new RestTemplate();

		return restTemplate.getForObject(url, String.class);
	}

	@GetMapping("/juego/{id}/trailers")
	public String obtenerTrailers(@PathVariable Long id) {

		String url = "https://api.rawg.io/api/games/" + id + "/movies?key=" + API_KEY;

		RestTemplate restTemplate = new RestTemplate();

		return restTemplate.getForObject(url, String.class);
	}

	@GetMapping("/juego/{id}")
	public Object obtenerJuegoPorId(@PathVariable Long id) {

		String url = "https://api.rawg.io/api/games/" + id + "?key=36198b2a8c6642ceb5cfdedcdbb37bf4";

		RestTemplate restTemplate = new RestTemplate();

		return restTemplate.getForObject(url, Object.class);
	}

}
