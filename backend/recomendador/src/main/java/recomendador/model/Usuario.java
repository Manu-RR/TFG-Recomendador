package recomendador.model;

//Importaciones necesarias para trabajar con JPA (base de datos)
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

//Indicamos que esta clase es una entidad de base de datos (tabla)
@Entity
public class Usuario {

	
	@Column(columnDefinition = "LONGTEXT")
	private String avatar;

	// Indica que este campo es la clave primaria (ID)
	@Id

	// El ID se genera automáticamente (auto-incremental)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	// Nombre del usuario
	@NotBlank(message = "El nombre no puede estar vacío")
	private String nombre;

	// Email del usuario (único en la base de datos)
	@NotBlank(message = "El email es obligatorio")
	@Email(message = "Debe ser un email válido")
	@Column(unique = true)
	private String email;

	// Contraseña del usuario (de momento sin encriptar)
	@NotBlank(message = "La contraseña es obligatoria")
	@Size(min = 4, message = "La contraseña debe tener al menos 4 caracteres")
	private String password;

	// Rol del usuario (USER o ADMIN)
	private String rol;

	// Token de sesión simple
	private String token;

	// ===== GETTERS Y SETTERS =====
	// Sirven para acceder y modificar los datos del objeto

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRol() {
		return rol;
	}

	public void setRol(String rol) {
		this.rol = rol;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}
}
