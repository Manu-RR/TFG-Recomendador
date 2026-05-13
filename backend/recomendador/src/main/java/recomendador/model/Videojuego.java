package recomendador.model;

import jakarta.persistence.*;
import java.util.List;

@Entity // Indica que esta clase es una tabla en la BD
public class Videojuego {

    @Id // Clave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Título del videojuego
    private String titulo;

    // Descripción breve
    private String descripcion;

    // Duración estimada en horas
    private int duracionEstimada;

    // Nivel de dificultad (1 a 5)
    private int dificultad;

    // Valoración media del juego
    private double valoracionMedia;

    // ===== RELACIÓN MUCHOS A MUCHOS =====
    // Un videojuego puede tener varios géneros
    @ManyToMany
    @JoinTable(
        name = "videojuego_genero", // nombre tabla intermedia
        joinColumns = @JoinColumn(name = "videojuego_id"), // FK videojuego
        inverseJoinColumns = @JoinColumn(name = "genero_id") // FK género
    )
    private List<Genero> generos;

    // ===== GETTERS Y SETTERS =====

    public Long getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public int getDuracionEstimada() {
        return duracionEstimada;
    }

    public void setDuracionEstimada(int duracionEstimada) {
        this.duracionEstimada = duracionEstimada;
    }

    public int getDificultad() {
        return dificultad;
    }

    public void setDificultad(int dificultad) {
        this.dificultad = dificultad;
    }

    public double getValoracionMedia() {
        return valoracionMedia;
    }

    public void setValoracionMedia(double valoracionMedia) {
        this.valoracionMedia = valoracionMedia;
    }

    public List<Genero> getGeneros() {
        return generos;
    }

    public void setGeneros(List<Genero> generos) {
        this.generos = generos;
    }
}
