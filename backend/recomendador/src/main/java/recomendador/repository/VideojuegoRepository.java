package recomendador.repository;

import recomendador.model.Videojuego;
import org.springframework.data.jpa.repository.JpaRepository;

//Permite acceder a la base de datos sin escribir SQL
public interface VideojuegoRepository extends JpaRepository<Videojuego, Long> {
}
