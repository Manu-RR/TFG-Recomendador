Aquí tienes la versión final y optimizada de tu archivo README.md. He corregido el error de formato en la sección de SQL y organizado los bloques de código para que sean totalmente legibles.

Sistema Recomendador de Videojuegos
Proyecto TFG de DAW desarrollado con Java, Spring Boot y MySQL.

El sistema permite gestionar usuarios, videojuegos y géneros, estableciendo la base para un futuro motor de recomendación personalizado.

Tecnologías utilizadas
Java 17

Spring Boot

Spring Data JPA

MySQL

Maven

Postman

Eclipse

Requisitos previos
Antes de arrancar el proyecto es necesario tener instalado:

Java 17

Maven

MySQL 8

Eclipse o IntelliJ

Postman

Base de datos
Crear la base de datos ejecutando el siguiente comando en tu gestor de MySQL:

SQL
CREATE DATABASE recomendador_db;
Configuración
Editar el archivo:
src/main/resources/application.properties

Con la siguiente configuración:

Properties
spring.datasource.url=jdbc:mysql://localhost:3306/recomendador_db
spring.datasource.username=root
spring.datasource.password=TU_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8080
Nota: Asegúrate de cambiar TU_PASSWORD por tu clave de acceso local.

Arranque del proyecto
Ejecutar la clase principal: RecomendadorApplication.java

Cuando el sistema arranque correctamente aparecerá en consola:

Started RecomendadorApplication

Tomcat started on port 8080

URL base: http://localhost:8080

Endpoints disponibles
Usuarios
Crear usuario

POST /usuarios

Ejemplo JSON:

JSON
{
  "nombre": "Juan",
  "email": "juan@test.com",
  "password": "1234",
  "rol": "USER"
}
Listar usuarios

GET /usuarios

Videojuegos
Crear videojuego

POST /videojuegos

Ejemplo JSON:

JSON
{
  "titulo": "Skyrim",
  "descripcion": "Juego RPG de fantasia",
  "duracionEstimada": 100,
  "dificultad": 3,
  "valoracionMedia": 4.9
}
Listar videojuegos

GET /videojuegos

Géneros
Crear género

POST /generos

Ejemplo JSON:

JSON
{
  "nombre": "RPG"
}
Listar géneros

GET /generos

Relaciones
Relacionar videojuego con género

POST /videojuegos/{videojuegoId}/generos/{generoId}

Ejemplo: POST /videojuegos/3/generos/1