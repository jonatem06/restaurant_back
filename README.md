# POS Restaurante Backend

Sistema de punto de venta (POS) para restaurantes desarrollado con Node.js, Express y MongoDB. Este sistema ofrece una arquitectura escalable y robusta para gestionar personal, ventas, recetas y finanzas avanzadas.

## 🚀 Tecnologías

- **Node.js + Express**: Framework principal.
- **MongoDB + Mongoose**: Base de datos NoSQL y modelado de datos.
- **Socket.io**: Comunicación en tiempo real para la cocina.
- **JWT + bcrypt**: Autenticación segura y hashing de contraseñas.
- **Express Validator**: Validación de datos de entrada.
- **Docker**: Contenerización completa.

## ✨ Características Principales

- **Gestión de Personal**: CRUD completo de empleados con roles (Vendedor, Gerente, Cocina).
- **Control de Menú y Recetas**: Gestión de productos base, recetas con cálculo de costo, items de menú y paquetes.
- **Ventas Seguras**: Validación de precios en el servidor y actualización de estado en tiempo real.
- **Lógica Financiera Avanzada**: Cálculo realista del punto de equilibrio, margen promedio, ticket promedio y ganancias brutas/netas mediante agregaciones de MongoDB.
- **Cocina en Tiempo Real**: Recepción de pedidos instantánea mediante sockets.
- **Seguridad**: Protección de rutas por roles y validación estricta de payloads.

## 🛠️ Instalación y Configuración

### Requisitos
- Docker y Docker Compose (Recomendado)
- Node.js 20.x (Para ejecución local)
- MongoDB (Para ejecución local)

### Usando Docker (Recomendado)

1. Clonar el repositorio.
2. Crear un archivo `.env` basado en `.env.example`.
3. Ejecutar el comando:
   ```bash
   docker-compose up --build
   ```
4. El backend estará disponible en `http://localhost:3000`.

### Ejecución Local

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Ejecutar seeds para datos iniciales:
   ```bash
   npm run seed
   ```
3. Iniciar en modo desarrollo:
   ```bash
   npm run dev
   ```

## 🐳 Dockerización

El proyecto incluye un `Dockerfile` optimizado y un `docker-compose.yml` que orquestra el servicio de API y la base de datos MongoDB con persistencia de datos mediante volúmenes.

---

Desarrollado con enfoque en escalabilidad y limpieza de código.
