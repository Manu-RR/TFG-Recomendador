package recomendador.model;

//Importaciones JPA
import jakarta.persistence.*;

//Esta clase representa la tabla generos
@Entity
public class Genero {

 // Clave primaria
 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;

 // Nombre del género (RPG, FPS, Indie...)
 private String nombre;

 // ===== GETTERS Y SETTERS =====

 public Long getId() {
     return id;
 }

 public String getNombre() {
     return nombre;
 }

 public void setNombre(String nombre) {
     this.nombre = nombre;
 }
}
