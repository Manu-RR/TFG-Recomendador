package recomendador.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import recomendador.model.Favorito;
import recomendador.model.Usuario;
import recomendador.repository.FavoritoRepository;
import recomendador.repository.UsuarioRepository;

import java.util.List;


@RestController
@RequestMapping("/favoritos")
public class FavoritoController {

    @Autowired
    private FavoritoRepository favoritoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Obtener favoritos de un usuario
    @GetMapping("/{usuarioId}")
    public List<Favorito> obtenerFavoritos(
            @PathVariable Long usuarioId) {

        return favoritoRepository.findByUsuarioId(usuarioId);

    }

    // Guardar favorito
    @PostMapping("/{usuarioId}")
    public Favorito guardarFavorito(
            @PathVariable Long usuarioId,
            @RequestBody Favorito favorito) {

        Usuario usuario = usuarioRepository
                .findById(usuarioId)
                .orElse(null);

        favorito.setUsuario(usuario);

        return favoritoRepository.save(favorito);

    }

    // Eliminar favorito
    @DeleteMapping("/{favoritoId}")
    public void eliminarFavorito(
            @PathVariable Long favoritoId) {

        favoritoRepository.deleteById(favoritoId);

    }
}
