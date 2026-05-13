package recomendador.repository;

import recomendador.model.ListaJuego;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ListaJuegoRepository extends JpaRepository<ListaJuego, Long> {

	List<ListaJuego> findByUsuarioId(Long usuarioId);

	long countByUsuarioIdAndEstado(Long usuarioId, String estado);

	Optional<ListaJuego> findByUsuarioIdAndJuegoId(Long usuarioId, Long juegoId);

}
