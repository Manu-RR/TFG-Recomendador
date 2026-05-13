package recomendador.repository;

import recomendador.model.Favorito;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoritoRepository extends JpaRepository<Favorito, Long> {

	List<Favorito> findByUsuarioId(Long usuarioId);

	long count();

	long countByUsuarioId(Long usuarioId);
}
