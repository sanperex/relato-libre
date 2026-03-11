# 📚 RelatoLibre | Tu Librería Online

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.3.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![MUI](https://img.shields.io/badge/Material_UI-5.x-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6.x-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)

---

## 📖 Descripción

**RelatoLibre** es una tienda de libros online desarrollada con React y Material UI. Permite explorar un catálogo de libros, agregar productos al carrito, gestionar favoritos y administrar la cuenta del usuario. También incluye una sección educativa con los 7 hooks más importantes de React con demostraciones interactivas.

### ✨ Funcionalidades principales

- 🔍 Búsqueda y filtrado de libros por categoría
- 🛒 Carrito de compras con cálculo de envío
- ❤️ Lista de favoritos
- 👤 Registro e inicio de sesión con persistencia en localStorage
- ✏️ Edición de perfil de usuario
- 📦 Página de historial de compras
- ⚓ Sección educativa de React Hooks interactivos
- 📱 Diseño responsive para móvil y escritorio

---

## 🛠️ Tecnologías usadas

| Tecnología | Versión | Uso |
|---|---|---|
| React | 18.3.1 | Librería principal de UI |
| Vite | 5.3.1 | Bundler y servidor de desarrollo |
| Material UI | 5.x | Componentes visuales |
| MUI Icons | 5.x | Iconografía |
| React Router DOM | 6.x | Navegación entre páginas |
| Emotion | 11.x | Estilos en MUI |

---

## 📁 Estructura de carpetas

```
src/
├── App.jsx                          # Componente raíz con tema y providers
├── Routes.jsx                       # Definición de rutas
├── main.jsx                         # Punto de entrada
│
├── features/
│   ├── articles/
│   │   ├── components/
│   │   │   ├── BookCard.jsx         # Tarjeta de libro reutilizable
│   │   │   ├── Books.jsx            # Datos mock de libros y categorías
│   │   │   ├── CartContext.jsx      # Contexto global del carrito
│   │   │   └── useCart.js           # Hook para consumir el carrito
│   │   └── pages/
│   │       ├── Home.jsx             # Página principal con catálogo
│   │       ├── BookDetail.jsx       # Detalle de un libro
│   │       ├── Cart.jsx             # Carrito de compras
│   │       └── Hooks.jsx            # Sección educativa de hooks
│   │
│   └── auth/
│       ├── components/
│       │   ├── Myaccount.jsx        # Perfil del usuario
│       │   ├── Mybuys.jsx           # Historial de compras
│       │   └── Myfavorites.jsx      # Lista de favoritos
│       └── pages/
│           ├── Login.jsx            # Inicio de sesión
│           └── Register.jsx         # Registro de usuario
│
├── layout/
│   └── components/
│       ├── MainLayout.jsx           # Layout con Navbar y Footer
│       ├── Navbar.jsx               # Barra de navegación
│       └── Footer.jsx               # Pie de página
│
└── shared/
    └── styles/
        └── theme.js                 # Configuración del tema MUI
```

---

## 🖼️ Capturas de pantalla

> 📌capturas de pantalla del proyecto.


![Home](https://github.com/user-attachments/assets/e2b68df7-49ae-4a14-8060-08e849a1ffe1)
![Detalle](https://github.com/user-attachments/assets/a2bedb46-8628-4c19-9e00-a71eb5093d75)
![Carrito](https://github.com/user-attachments/assets/2170d43a-4ea1-4d09-be1a-0c66d43f56c8)

---

## 👤 Autor

Desarrollado por **Santiago Pérez Calle**

---

> Proyecto desarrollado con fines educativos usando React + Vite + Material UI.



