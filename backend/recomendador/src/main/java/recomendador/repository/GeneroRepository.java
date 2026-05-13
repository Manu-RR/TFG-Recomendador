package recomendador.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import recomendador.model.Genero;

// Acceso a base de datos para géneros
public interface GeneroRepository extends JpaRepository<Genero, Long> {
}
