# AppNube

Bienvenido a **AppNube**, una aplicación de ecommerce donde podrás gestionar productos y realizar compras, con roles de usuario y administrador. Aquí te detallamos cómo funciona cada sección y las características más importantes.

## Descripción de la Aplicación

### Autenticación

- **Inicio de Sesión**: Al ingresar a la aplicación, deberás iniciar sesión usando tu email y contraseña.
- **Registro**: Si no tienes una cuenta, puedes registrarte proporcionando tu nombre, email, contraseña y seleccionando un rol (`admin` o `user`).

### Funcionalidades del Usuario

Una vez dentro de la aplicación, tendrás acceso a las siguientes secciones:

- **Navbar**: 
  - Accede al carrito de compras.
  - Navega al **Home** donde verás todos los productos disponibles.
  
- **Home**: 
  - Visualiza todos los productos con su imagen, nombre y precio.
  - Selecciona la cantidad deseada y agrégala al carrito.
  - Explora más detalles de los productos, como la descripción y el stock disponible, y agrégalos al carrito desde ahí.

- **Carrito**: 
  - Al hacer clic en el ícono del carrito en el navbar, se abrirá una barra lateral donde podrás:
    - Ver los productos añadidos.
    - Eliminar productos.
    - Vaciar el carrito.
    - Confirmar la compra.
  - Al confirmar la compra, recibirás una orden con su respectiva referencia.

### Funcionalidades del Administrador

Los administradores tienen acceso a una página especial donde pueden:

- Realizar un CRUD completo de los productos y marcas.
- Ver todas las órdenes realizadas por los usuarios.

## URL de la Aplicación

Puedes acceder al frontend de la aplicación en el siguiente enlace:
[https://frontend-appsnube.vercel.app/](https://frontend-appsnube.vercel.app/)

## Tecnologías y Librerías Utilizadas

- **Next.js**: Framework para el desarrollo de aplicaciones web del lado del cliente y servidor, con soporte para renderizado estático y dinámico.
- **React**: Biblioteca de JavaScript para construir interfaces de usuario basadas en componentes.
- **Material-UI (MUI)**: Librería de componentes React que implementa el sistema de diseño de Google Material Design.
  - **@mui/material**: Componentes principales de MUI.
  - **@mui/icons-material**: Íconos de Material Design para usar en tu proyecto.
  - **@emotion/react** y **@emotion/styled**: Librerías para aplicar estilos CSS en tus componentes React.
- **Redux Toolkit**: Herramienta para la gestión global del estado de la aplicación de una manera predecible y eficiente.
  - **react-redux**: Conector para usar Redux en aplicaciones React.
- **Axios**: Cliente HTTP para realizar peticiones a APIs.
- **Formik**: Biblioteca para la creación y gestión de formularios con validaciones.
- **Yup**: Librería para la validación de esquemas de datos, comúnmente usada con Formik.
- **Toastify**: Para mostrar notificaciones en la interfaz de usuario de forma elegante.
- **TailwindCSS**: Framework de utilidades CSS para construir interfaces de usuario modernas de manera rápida.
- **TypeScript**: Superconjunto de JavaScript que permite tipado estático, mejorando la seguridad y robustez del código.

### Dependencias de Desarrollo (devDependencies)

- **ESLint**: Herramienta para el análisis de código estático y detección de errores de código y estilo.
- **Typescript**: Añade tipado estático a JavaScript, lo que ayuda a prevenir errores comunes durante el desarrollo.
- **Nodemon**: Herramienta que reinicia automáticamente el servidor cuando detecta cambios en los archivos, útil para el desarrollo en backend (en caso que se utilice).


## Rutas de la Aplicación

- **/** - Home (Página principal con productos).
- **/auth/login** - Página de inicio de sesión.
- **/auth/register** - Página de registro de usuarios.
- **/admin** - Página principal del administrador.
- **/admin/brands** - Gestión de marcas (CRUD).
- **/admin/orders** - Visualización de las órdenes de compra.

## Cómo Ejecutar el Proyecto Localmente

Sigue estos pasos para levantar el proyecto en tu entorno local:

1. Clona el repositorio:

    ```bash
    git clone https://github.com/AlejoMattalia/frontend_appsnube.git
    ```

2. Navega al directorio del proyecto:

    ```bash
    cd frontend_appsnube
    ```

3. Instala las dependencias:

    ```bash
    npm install
    ```

4. Configura las variables de entorno, creando un archivo `.env.local` con la siguiente variable:

    ```bash
    NEXT_PUBLIC_API_URL=https://backend-appsnube.onrender.com/
    ```

5. Inicia el servidor de desarrollo:

    ```bash
    npm run dev
    ```

El servidor estará corriendo en el puerto 3000 por defecto.
