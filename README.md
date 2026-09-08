# Sistema de Gestión Académica (SGA)

Proyecto desarrollado durante la materia Programación IV.

## Descripción

El Sistema de Gestión Académica (SGA) es una aplicación web que permitirá administrar alumnos, docentes, cursos y materias.

Durante el desarrollo del proyecto se incorporarán progresivamente nuevas tecnologías y funcionalidades.


## Objetivos

- Gestionar alumnos.
- Gestionar docentes.
- Gestionar cursos.
- Gestionar materias.
- Implementar autenticación de usuarios.
- Consumir una API REST.
- Persistir la información en MongoDB.


## Tecnologías

Actualmente:

- HTML5
- JavaScript
- CSS
- express
- node.js


Próximamente:
- React
- Node.js
- Express
- MongoDB

## Estado del proyecto

- Versión: 
Clase 12 - Estructura actual
SGA/
frontend
 ├── index.html
 ├── alumnos.html
 ├── docentes.html
 │
 ├── css/
 │   └── estilos.css
 │
 └── js/
      ├── alumnos.js
      └── docentes.js
backend

## Estado actual
- Página de inicio y navegación entre módulos
- Módulo alumnos docentes
- CRUD alumnos/docentes
- Validaciones de formularios
- Persistencia mediante localStorage
- Organización del código y refactorización
- Separación inicial entre Frontend y Backend
- implementacion de validaciones para los datos recibidos mediante req.body
- uso de status 400 para los datos invalidos
- status 400 para alumno no encontrado 
- status 404 para alumno no encontrado 
- status 201 para registrar nuevo alumno 
- manejo basico de errores en las operaciones del CRUD. 

## Almacenamiento

- localStorage
- JSON.stringify()
- JSON.parse()

## Autor

Lourdes Trosch
Programacion IV