# Plan de Implementación: Proyecto "Capital Pets"

Este documento detalla las especificaciones técnicas, la arquitectura y los pasos de desarrollo para crear la plataforma web de la tienda de mascotas "Capital Pets". El objetivo es construir un MVP (Producto Mínimo Viable) robusto, escalable y siguiendo los principios SOLID.

## 1. Información General
* **Nombre de la Tienda:** Capital Pets.
* **Rubro:** Mascotas, comida, accesorios y repostería (gelatinas, queques).
* **Objetivo:** Catálogo web con panel administrativo para gestión de inventario y registro de ventas.

## 2. Stack Tecnológico
* **Frontend:** Nuxt 3 (Vue.js) + Tailwind CSS.
    * *Razón:* Necesario para SEO (Server-Side Rendering) y escalabilidad.
* **Backend:** Node.js + Express + TypeScript.
    * *Razón:* Alta compatibilidad con herramientas de IA y robustez de tipos.
* **Base de Datos:** PostgreSQL (alojada en Render).
* **ORM:** Prisma (para facilitar la gestión de esquemas y tipos).
* **Almacenamiento de Imágenes:** Cloudinary API.
* **Despliegue:**
    * Frontend: Vercel.
    * Backend/DB: Render.
    * SSL: Gestionado automáticamente por Vercel/Render vía Let's Encrypt (HTTPS nativo).

## 3. Arquitectura y Principios SOLID
Se requiere que el código siga una estructura de **Arquitectura en Capas**:
1.  **Capa de Rutas (Controllers):** Manejo de peticiones HTTP.
2.  **Capa de Servicios (Business Logic):** Lógica de negocio pura (SRP - Single Responsibility Principle).
3.  **Capa de Acceso a Datos (Repository/Prisma):** Interacción con la base de datos.
4.  **Interfaces/Types:** Definiciones de contratos para facilitar el principio de Inversión de Dependencias.

## 4. Modelado de Base de Datos (PostgreSQL)
### Tabla `User`
* `id` (UUID, PK)
* `email` (String, Unique)
* `password` (Hashed)
* `role` (Enum: ADMIN, CUSTOMER)

### Tabla `Category`
* `id` (Int, PK)
* `name` (String: "Comida", "Accesorios", "Postres", etc.)

### Tabla `Product`
* `id` (UUID, PK)
* `name` (String)
* `description` (Text)
* `price` (Decimal)
* `stock` (Int)
* `imageUrl` (String - URL de Cloudinary)
* `categoryId` (FK -> Category)

### Tabla `Sale`
* `id` (UUID, PK)
* `total` (Decimal)
* `date` (DateTime)
* `type` (Enum: MANUAL, ONLINE)
* `status` (String: "Completado", "Pendiente")

## 5. Implementación por Fases

### Fase 1: Configuración de Infraestructura
1.  Inicializar proyecto Nuxt 3 con Tailwind.
2.  Inicializar Backend Express con TypeScript y Prisma.
3.  Configurar cuenta de Cloudinary y obtener API Keys.
4.  Configurar base de datos PostgreSQL en Render.

### Fase 2: Backend API
1.  **Auth:** Implementar registro/login con JWT.
2.  **CRUD Productos:** Rutas para añadir, editar, eliminar y listar productos.
3.  **Integración Cloudinary:** Crear un servicio en el backend que reciba el buffer de imagen, lo suba a Cloudinary y retorne la URL.
4.  **Ventas:** Endpoint para registrar ventas manuales y listar historial.

### Fase 3: Frontend (Catálogo y Admin)
1.  **Layouts:** Diseño minimalista y profesional para "Capital Pets".
2.  **Catálogo Público:**
    * Barra de búsqueda y filtros por categoría.
    * Cards de productos con imagen, precio y descripción.
3.  **Panel Admin:**
    * Dashboard de ventas.
    * Formulario de creación de productos (con subida de imagen).
    * Gestión de stock.

### Fase 4: SSL y Despliegue
1.  Configurar variables de entorno en Render y Vercel (`DATABASE_URL`, `CLOUDINARY_URL`, `JWT_SECRET`).
2.  Desplegar Backend en Render.
3.  Desplegar Frontend en Vercel apuntando al dominio de Render.
4.  Verificar la emisión automática del certificado SSL (Let's Encrypt).

## 6. Hoja de Ruta (Futuros Pasos)
El sistema debe estar preparado (mediante interfaces y servicios desacoplados) para las siguientes fechas:
* **22-05-26:** Incorporación de Google Analytics y vinculación con Facebook/Instagram.
* **22-05-26:** Aplicar técnicas de SEO (Nuxt `useHead` dinámico).
* **29-05-26:** Plugins sociales (WhatsApp, Messenger, TikTok).
* **02-06-26:** Primera versión de documentación oficial.
* **02-06-26:** Pasarela de pago PayPal (Integrar SDK en el servicio de pagos).
* **07-06-26:** Chat en línea (Tawk.to) y contenido final.
* **19-06-26:** Entrega final del sitio y documento.

---
**Instrucción para el Agente IA:** Prioriza la claridad del código y el manejo de errores. No uses archivos CSV para persistencia; utiliza exclusivamente el esquema de Prisma/PostgreSQL definido.
