package recomendador.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Resena {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private Long juegoId;

	private String nombreJuego;

	private LocalDateTime fecha;

	@Column(length = 2000)
	private String comentario;

	private int puntuacion;

	@ManyToOne
	@JoinColumn(name = "usuario_id")
	private Usuario usuario;

	public Resena() {
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

	public String getComentario() {
		return comentario;
	}

	public void setComentario(String comentario) {
		this.comentario = comentario;
	}

	public int getPuntuacion() {
		return puntuacion;
	}

	public void setPuntuacion(int puntuacion) {
		this.puntuacion = puntuacion;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public LocalDateTime getFecha() {
		return fecha;
	}

	public void setFecha(LocalDateTime fecha) {
		this.fecha = fecha;
	}
}
