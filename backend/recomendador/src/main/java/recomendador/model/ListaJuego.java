package recomendador.model;

import jakarta.persistence.*;

@Entity
@Table(
	    uniqueConstraints = {
	        @UniqueConstraint(
	            columnNames = {
	                "usuario_id",
	                "juegoId"
	            }
	        )
	    }
	)

public class ListaJuego {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private Long juegoId;

	private String nombreJuego;

	private String imagenJuego;

	private String estado;

	@ManyToOne
	@JoinColumn(name = "usuario_id")
	private Usuario usuario;

	public ListaJuego() {
	}

	public Long getId() {
		return id;
	}

	public Long getJuegoId() {
		return juegoId;
	}

	public void setJuegoId(Long juegoId) {
		this.juegoId = juegoId;
	}

	public String getNombreJuego() {
		return nombreJuego;
	}

	public void setNombreJuego(String nombreJuego) {
		this.nombreJuego = nombreJuego;
	}

	public String getImagenJuego() {
		return imagenJuego;
	}

	public void setImagenJuego(String imagenJuego) {
		this.imagenJuego = imagenJuego;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
}
