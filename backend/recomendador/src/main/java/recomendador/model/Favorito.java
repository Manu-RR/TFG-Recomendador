package recomendador.model;


import jakarta.persistence.*;

@Entity
public class Favorito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Usuario dueño del favorito
    @ManyToOne
    private Usuario usuario;

    // ID del juego RAWG
    private Long juegoId;

    // Nombre juego
    private String nombreJuego;

    // Imagen juego
    private String imagenJuego;

    // Constructor vacío
    public Favorito() {
    }

    // Getters y setters

    public Long getId() {
        return id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
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
}
