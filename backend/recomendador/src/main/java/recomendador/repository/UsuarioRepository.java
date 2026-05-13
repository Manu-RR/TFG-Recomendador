package recomendador.repository;

//Importamos la entidad Usuario
import recomendador.model.Usuario;

//Importamos JpaRepository para tener funciones ya hechas (guardar, buscar, etc.)
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

//Esta interfaz conecta con la base de datos
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

	// Método personalizado para buscar un usuario por su email
	Optional<Usuario> findByEmail(String email);

	Optional<Usuario> findByToken(String token);
}