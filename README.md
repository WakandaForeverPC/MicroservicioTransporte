# Microservicio Transporte

## Descripción
Este microservicio es parte de un sistema más grande que se conecta a un **API Gateway**, **Eureka** (para el descubrimiento de servicios) y un **servidor de configuración**. El microservicio se encarga de gestionar el transporte público en una ciudad, proporcionando endpoints para obtener información sobre los autobuses y sus rutas.

---

## Tecnologías Utilizadas
- **Java 17**
- **Spring Boot**
- **Spring Cloud Netflix Eureka**
- **Spring Cloud Config**
- **Spring WebSocket**
- **Thymeleaf**

---

## Estructura del Proyecto

### Clases Principales
- **`MicroservicioTransporteApplication`**  
  Clase principal que inicia la aplicación Spring Boot.

- **`TransporteBoardController`**  
  Controlador que maneja las vistas Thymeleaf, específicamente para mostrar el tablero de transporte.

- **`TransporteController`**  
  Controlador REST que expone endpoints para obtener información sobre los autobuses.

- **`Bus`**  
  Entidad que representa un autobús en el sistema.

- **`TransportService`**  
  Servicio que maneja la lógica de negocio relacionada con los autobuses.

- **`TransportUpdater`**  
  Componente programado que actualiza periódicamente los datos de transporte.

- **`TransportWebSocketService`**  
  Servicio que envía actualizaciones de transporte a través de WebSocket.

- **`WebSocketConfig`**  
  Configuración de WebSocket para el microservicio.

---

## Endpoints

### Autobuses
- **GET** `/transporte/buses`: Obtiene la lista de autobuses.

---

## Configuración
Archivo principal: **`application.properties`**
spring.application.name=microservicio-transporte
server.port=8082
eureka.client.service-url.defaultZone=http://localhost:8761/eureka/
spring.cloud.config.uri=http://localhost:8888
spring.config.import=optional:configserver:http://localhost:8888
spring.thymeleaf.prefix=classpath:/templates/
spring.thymeleaf.suffix=.html
