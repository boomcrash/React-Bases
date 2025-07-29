# Guía Completa de React para Principiantes

## Tabla de Contenidos

1. [Introducción a React](#introducción-a-react)
2. [¿Qué es un Componente?](#qué-es-un-componente)
3. [Client Side Rendering (CSR)](#client-side-rendering-csr)
4. [Conceptos Fundamentales](#conceptos-fundamentales)
5. [Hooks Básicos](#hooks-básicos)
6. [Consumo de APIs](#consumo-de-apis)
7. [Gestión de Estado con Zustand](#gestión-de-estado-con-zustand)
8. [Gestión de Estado con Redux](#gestión-de-estado-con-redux)
9. [Ejercicios Prácticos](#ejercicios-prácticos)

---

## Introducción a React

**React** es una biblioteca de JavaScript desarrollada por Facebook para crear interfaces de usuario interactivas y dinámicas. Es especialmente útil para construir aplicaciones web modernas de una sola página (SPA - Single Page Applications).

### ¿Por qué usar React?

- **Componentes Reutilizables**: Permite crear piezas de código que se pueden usar múltiples veces
- **Virtual DOM**: Optimiza el rendimiento de la aplicación
- **Ecosistema Rico**: Gran cantidad de librerías y herramientas disponibles
- **Comunidad Activa**: Amplio soporte y documentación

---

## ¿Qué es un Componente?

Un **componente** es como un bloque de construcción LEGO. Imagina que estás construyendo una casa:

- Cada ventana sería un componente
- Cada puerta sería un componente
- El techo sería un componente

En React, un componente es una **función de JavaScript que retorna HTML** (JSX). Estos componentes pueden recibir datos (props) y tener su propio estado interno.

### Anatomía de un Componente

```jsx
// src/components/Saludo.jsx
import React from "react";

const Saludo = ({ nombre }) => {
  return <h2>¡Hola, {nombre}!</h2>;
};

export default Saludo;
```

**Explicación línea por línea:**

1. `import React from 'react'`: Importamos la biblioteca de React
2. `const Saludo = ({ nombre }) => {`: Creamos un componente funcional que recibe una prop llamada "nombre"
3. `return <h2>¡Hola, {nombre}!</h2>`: Retornamos JSX (HTML + JavaScript)
4. `export default Saludo`: Exportamos el componente para usarlo en otros archivos

### Usando el Componente

```jsx
// src/App.jsx
import Saludo from "./components/Saludo";

function App() {
  return <Saludo nombre="Milton" />;
}

export default App;
```

---

## Client Side Rendering (CSR)

**Client Side Rendering** significa que la página web se "construye" en el navegador del usuario, no en el servidor.

### ¿Cómo funciona?

**Método Tradicional (Server Side):**

1. Usuario solicita una página
2. Servidor genera HTML completo
3. Envía HTML al navegador
4. Usuario ve la página

**Client Side Rendering:**

1. Usuario solicita una página
2. Servidor envía HTML básico + JavaScript
3. JavaScript se ejecuta en el navegador
4. JavaScript construye la página dinámicamente

### Ventajas del CSR

- **Interactividad**: Las páginas responden inmediatamente a las acciones del usuario
- **Navegación Rápida**: Una vez cargada, navegar entre páginas es instantáneo
- **Experiencia de Usuario**: Sensación de aplicación nativa

### Desventajas del CSR

- **Carga Inicial**: Puede ser más lenta la primera vez
- **SEO**: Los motores de búsqueda pueden tener dificultades para indexar el contenido

---

## Conceptos Fundamentales

### 1. Props (Propiedades)

Las **props** son como argumentos que pasas a una función. Permiten enviar datos de un componente padre a un componente hijo.

### ¿Cómo funcionan las Props?

**Analogía de la vida real:**
Las props son como **ingredientes** que le das a un chef (componente):

- Tú (componente padre) le das ingredientes específicos
- El chef (componente hijo) usa esos ingredientes
- El chef hace un plato diferente según los ingredientes que reciba
- El chef NO puede cambiar los ingredientes originales

**Flujo completo de Props:**

1. **Componente padre** tiene datos para compartir
2. **Llamada al hijo**: `<ComponenteHijo prop1="valor1" prop2="valor2" />`
3. **Props se envían**: React empaqueta las props en un objeto
4. **Componente hijo recibe**: `function ComponenteHijo({ prop1, prop2 })`
5. **Uso en JSX**: El hijo usa las props en su renderizado
6. **Renderizado**: El hijo se dibuja usando los datos recibidos
7. **Props son inmutables**: El hijo NO puede cambiar las props originales

**Ejemplo visual del flujo:**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Padre dice:    │ →  │  Props viajan:  │ →  │  Hijo recibe:   │
│  "nombre=Juan"  │    │  {nombre:"Juan"}│    │  {nombre:"Juan"}│
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                       ↓
                                           ┌─────────────────┐
                                           │  Hijo renderiza:│
                                           │  "Hola, Juan!"  │
                                           └─────────────────┘
```

```jsx
// Componente Tarjeta que recibe props
const Tarjeta = ({ titulo, contenido, color }) => {
  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "1rem",
        margin: "1rem",
        backgroundColor: color,
      }}
    >
      <h3>{titulo}</h3>
      <p>{contenido}</p>
    </div>
  );
};

// Usando el componente con diferentes props
function App() {
  return (
    <>
      <Tarjeta
        titulo="Bienvenido"
        contenido="Esta es una tarjeta azul"
        color="lightblue"
      />
      <Tarjeta
        titulo="Información"
        contenido="Esta es una tarjeta verde"
        color="lightgreen"
      />
    </>
  );
}
```

**Características de las Props:**

- Son **inmutables** (no se pueden cambiar dentro del componente hijo)
- Fluyen de **arriba hacia abajo** (padre → hijo)
- Permiten la **reutilización** de componentes

### 2. Estado (State)

El **estado** es la "memoria" de un componente. Son datos que pueden cambiar con el tiempo y cuando cambian, el componente se vuelve a renderizar.

### ¿Cómo funciona el Estado?

Imagina el estado como la **memoria a corto plazo** de una persona:

- Recuerda información importante (datos actuales)
- Puede cambiar con nuevas experiencias (eventos del usuario)
- Cuando algo importante cambia, reacciona (re-renderiza el componente)

**Flujo de funcionamiento del Estado:**

1. **Inicialización**: `useState(valorInicial)` crea el estado con un valor inicial
2. **Lectura**: El componente lee el valor actual del estado
3. **Renderizado**: React dibuja la interfaz usando ese valor
4. **Evento**: El usuario interactúa (click, input, etc.)
5. **Actualización**: Se llama a la función setter (`setState`)
6. **Re-renderizado**: React detecta el cambio y vuelve a dibujar el componente
7. **Nueva interfaz**: El usuario ve los cambios actualizados

**Ejemplo Visual del Flujo:**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Estado: 0     │ →  │  Botón: "0"     │ →  │  Usuario hace   │
│                 │    │                 │    │  click          │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         ↑                                              ↓
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ React actualiza │ ←  │ setState(1)     │ ←  │ Función onClick │
│ interfaz: "1"   │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

```jsx
import { useState } from "react";

const Contador = () => {
  // useState retorna [valor_actual, función_para_cambiar_valor]
  const [cuenta, setCuenta] = useState(0);

  const incrementar = () => {
    setCuenta(cuenta + 1);
  };

  const decrementar = () => {
    setCuenta(cuenta - 1);
  };

  return (
    <div>
      <h2>Contador: {cuenta}</h2>
      <button onClick={incrementar}>+</button>
      <button onClick={decrementar}>-</button>
    </div>
  );
};
```

**Puntos clave del Estado:**

- Es **local** al componente
- Cuando cambia, el componente se **re-renderiza**
- Debe actualizarse usando la función setter (setCuenta)
- **Nunca** modifiques el estado directamente

---

## Hooks Básicos

Los **Hooks** son funciones especiales que permiten "enganchar" funcionalidades de React en componentes funcionales.

### 1. useState - Manejo de Estado

**useState** es como tener una **caja mágica** que guarda información y avisa cuando cambia.

### ¿Cómo funciona useState?

**Flujo completo de useState:**

1. **Declaración**: `const [valor, setValor] = useState(inicial)`
2. **Desestructuración**: React te da 2 cosas:
   - `valor`: El dato actual
   - `setValor`: Función para cambiar el dato
3. **Uso en JSX**: Mostrar el valor en la interfaz
4. **Evento**: Usuario interactúa (click, input, etc.)
5. **Llamada a setter**: `setValor(nuevoValor)`
6. **React reacciona**: Detecta cambio y programa re-renderizado
7. **Re-renderizado**: Componente se ejecuta otra vez con nuevo valor
8. **Actualización**: Interfaz se actualiza automáticamente

**Analogía de la vida real:**

- **useState** = Termómetro digital
- **valor actual** = Temperatura mostrada
- **función setter** = Sensor que detecta cambios
- **re-renderizado** = Actualización de la pantalla

```jsx
import { useState } from "react";

const FormularioLogin = () => {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [estaLogueado, setEstaLogueado] = useState(false);

  const manejarLogin = () => {
    if (usuario === "admin" && contraseña === "123") {
      setEstaLogueado(true);
    } else {
      alert("Credenciales incorrectas");
    }
  };

  if (estaLogueado) {
    return <h2>¡Bienvenido, {usuario}!</h2>;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Usuario"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
      />
      <button onClick={manejarLogin}>Iniciar Sesión</button>
    </div>
  );
};
```

### 2. useEffect - Efectos Secundarios

**useEffect** permite ejecutar código en momentos específicos del ciclo de vida del componente.

### ¿Cómo funciona useEffect?

**useEffect** es como un **mayordomo** que hace tareas específicas en momentos específicos:

- Cuando llegas a casa (componente se monta)
- Cuando algo cambia en casa (dependencias cambian)
- Cuando te vas de casa (componente se desmonta)

**Flujo completo de useEffect:**

1. **Componente se renderiza** por primera vez
2. **useEffect se ejecuta** después del renderizado
3. **Código del efecto** se ejecuta (llamada a API, timer, etc.)
4. **Si hay dependencias**: React las "memoriza"
5. **En próximos renderizados**: React compara dependencias
6. **Si dependencias cambiaron**: Ejecuta efecto otra vez
7. **Función de limpieza** (opcional): Se ejecuta antes del próximo efecto o al desmontar
8. **Componente se desmonta**: Ejecuta limpieza final

**Tipos de useEffect según dependencias:**

```jsx
// 1. Sin dependencias - Se ejecuta en CADA renderizado
useEffect(() => {
  console.log("Me ejecuto siempre");
});

// 2. Con array vacío [] - Se ejecuta SOLO una vez (al montar)
useEffect(() => {
  console.log("Me ejecuto solo al inicio");
}, []);

// 3. Con dependencias [valor] - Se ejecuta cuando 'valor' cambia
useEffect(() => {
  console.log("Me ejecuto cuando valor cambia");
}, [valor]);
```

**Casos de uso de useEffect:**

- Llamadas a APIs
- Suscripciones a eventos
- Temporizadores
- Limpieza de recursos

```jsx
import { useState, useEffect } from "react";

const RelojDigital = () => {
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    // Este código se ejecuta después de cada renderizado
    const intervalo = setInterval(() => {
      setHora(new Date());
    }, 1000);

    // Función de limpieza
    return () => {
      clearInterval(intervalo);
    };
  }, []); // [] significa que solo se ejecuta una vez

  return (
    <div>
      <h2>Hora actual: {hora.toLocaleTimeString()}</h2>
    </div>
  );
};
```

**Casos de uso de useEffect:**

- Llamadas a APIs
- Suscripciones a eventos
- Temporizadores
- Limpieza de recursos

### 3. useReducer - Estado Complejo

Cuando el estado se vuelve complejo, **useReducer** es una mejor opción que useState.

### ¿Cómo funciona useReducer?

**useReducer** es como tener un **administrador especializado** que maneja reglas complejas:

- Tu le envías **órdenes** (acciones)
- Él conoce todas las **reglas** (reducer function)
- Él actualiza el **estado** según las reglas
- Te notifica los **cambios**

**Flujo completo de useReducer:**

1. **Configuración inicial**: Defines estado inicial y función reducer
2. **useReducer se inicializa**: `const [state, dispatch] = useReducer(reducer, initialState)`
3. **Evento ocurre**: Usuario hace click, envía formulario, etc.
4. **Dispatch se llama**: `dispatch({ type: 'ACCION', payload: datos })`
5. **Reducer recibe**: (estadoActual, acción) como parámetros
6. **Reducer evalúa**: switch/if para determinar qué hacer
7. **Nuevo estado**: Reducer retorna nuevo estado
8. **React re-renderiza**: Componente se actualiza con nuevo estado

**Analogía de la vida real:**

- **State** = Saldo de tu cuenta bancaria
- **Dispatch** = Ticket de transacción que envías al banco
- **Reducer** = Empleado del banco que procesa transacciones
- **Action** = Tipo de transacción (depósito, retiro, transferencia)

**Cuándo usar useReducer vs useState:**

| useState                                | useReducer                        |
| --------------------------------------- | --------------------------------- |
| Estado simple (string, number, boolean) | Estado complejo (objetos, arrays) |
| Pocas formas de actualizar              | Múltiples formas de actualizar    |
| Lógica simple                           | Lógica compleja con reglas        |
| Un solo valor                           | Múltiples valores relacionados    |

```jsx
import { useReducer } from "react";

// Estado inicial
const estadoInicial = {
  tareas: [],
  filtro: "todas", // 'todas', 'completadas', 'pendientes'
};

// Función reducer que define cómo cambia el estado
function tareaReducer(estado, accion) {
  switch (accion.type) {
    case "AGREGAR_TAREA":
      return {
        ...estado,
        tareas: [
          ...estado.tareas,
          {
            id: Date.now(),
            texto: accion.texto,
            completada: false,
          },
        ],
      };

    case "COMPLETAR_TAREA":
      return {
        ...estado,
        tareas: estado.tareas.map((tarea) =>
          tarea.id === accion.id
            ? { ...tarea, completada: !tarea.completada }
            : tarea
        ),
      };

    case "CAMBIAR_FILTRO":
      return {
        ...estado,
        filtro: accion.filtro,
      };

    default:
      return estado;
  }
}

const ListaTareas = () => {
  const [estado, dispatch] = useReducer(tareaReducer, estadoInicial);
  const [nuevaTarea, setNuevaTarea] = useState("");

  const agregarTarea = () => {
    if (nuevaTarea.trim()) {
      dispatch({ type: "AGREGAR_TAREA", texto: nuevaTarea });
      setNuevaTarea("");
    }
  };

  const tareasParaMostrar = estado.tareas.filter((tarea) => {
    if (estado.filtro === "completadas") return tarea.completada;
    if (estado.filtro === "pendientes") return !tarea.completada;
    return true;
  });

  return (
    <div>
      <input
        value={nuevaTarea}
        onChange={(e) => setNuevaTarea(e.target.value)}
        placeholder="Nueva tarea..."
      />
      <button onClick={agregarTarea}>Agregar</button>

      <div>
        <button
          onClick={() => dispatch({ type: "CAMBIAR_FILTRO", filtro: "todas" })}
        >
          Todas
        </button>
        <button
          onClick={() =>
            dispatch({ type: "CAMBIAR_FILTRO", filtro: "pendientes" })
          }
        >
          Pendientes
        </button>
        <button
          onClick={() =>
            dispatch({ type: "CAMBIAR_FILTRO", filtro: "completadas" })
          }
        >
          Completadas
        </button>
      </div>

      <ul>
        {tareasParaMostrar.map((tarea) => (
          <li
            key={tarea.id}
            style={{
              textDecoration: tarea.completada ? "line-through" : "none",
            }}
          >
            <span>{tarea.texto}</span>
            <button
              onClick={() =>
                dispatch({ type: "COMPLETAR_TAREA", id: tarea.id })
              }
            >
              {tarea.completada ? "Desmarcar" : "Completar"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
```

---

## Consumo de APIs

### ¿Qué es una API?

Una **API** (Application Programming Interface) es como un mesero en un restaurante:

- Tú (aplicación) haces un pedido (request)
- El mesero (API) lleva tu pedido a la cocina (servidor)
- La cocina prepara la comida (procesa los datos)
- El mesero te trae la comida (response con datos)

### Ejemplo Básico: Lista de Usuarios

```jsx
import { useState, useEffect } from "react";

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        setCargando(true);
        const respuesta = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (!respuesta.ok) {
          throw new Error("Error al obtener usuarios");
        }

        const datos = await respuesta.json();
        setUsuarios(datos);
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    };

    obtenerUsuarios();
  }, []);

  if (cargando) return <div>Cargando usuarios...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            <strong>{usuario.name}</strong> - {usuario.email}
          </li>
        ))}
      </ul>
    </div>
  );
};
```

### Ejemplo Avanzado: CRUD Completo

```jsx
import { useState, useEffect } from "react";

const GestorPosts = () => {
  const [posts, setPosts] = useState([]);
  const [nuevoPost, setNuevoPost] = useState({ titulo: "", contenido: "" });
  const [editando, setEditando] = useState(null);

  // Obtener posts
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  // Crear post
  const crearPost = async () => {
    const respuesta = await fetch(
      "https://jsonplaceholder.typicode.com/posts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: nuevoPost.titulo,
          body: nuevoPost.contenido,
          userId: 1,
        }),
      }
    );

    const postCreado = await respuesta.json();
    setPosts([postCreado, ...posts]);
    setNuevoPost({ titulo: "", contenido: "" });
  };

  // Eliminar post
  const eliminarPost = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    });

    setPosts(posts.filter((post) => post.id !== id));
  };

  // Actualizar post
  const actualizarPost = async (id, datosActualizados) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosActualizados),
    });

    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, ...datosActualizados } : post
      )
    );
    setEditando(null);
  };

  return (
    <div>
      <h2>Gestor de Posts</h2>

      {/* Formulario para nuevo post */}
      <div
        style={{
          marginBottom: "20px",
          padding: "10px",
          border: "1px solid #ccc",
        }}
      >
        <h3>Crear Nuevo Post</h3>
        <input
          type="text"
          placeholder="Título"
          value={nuevoPost.titulo}
          onChange={(e) =>
            setNuevoPost({ ...nuevoPost, titulo: e.target.value })
          }
        />
        <textarea
          placeholder="Contenido"
          value={nuevoPost.contenido}
          onChange={(e) =>
            setNuevoPost({ ...nuevoPost, contenido: e.target.value })
          }
        />
        <button onClick={crearPost}>Crear Post</button>
      </div>

      {/* Lista de posts */}
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            marginBottom: "10px",
            padding: "10px",
            border: "1px solid #eee",
          }}
        >
          {editando === post.id ? (
            // Modo edición
            <div>
              <input
                defaultValue={post.title}
                onBlur={(e) =>
                  actualizarPost(post.id, { title: e.target.value })
                }
              />
              <textarea
                defaultValue={post.body}
                onBlur={(e) =>
                  actualizarPost(post.id, { body: e.target.value })
                }
              />
              <button onClick={() => setEditando(null)}>Guardar</button>
            </div>
          ) : (
            // Modo vista
            <div>
              <h4>{post.title}</h4>
              <p>{post.body}</p>
              <button onClick={() => setEditando(post.id)}>Editar</button>
              <button onClick={() => eliminarPost(post.id)}>Eliminar</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
```

---

## Gestión de Estado con Zustand

### ¿Qué es Zustand?

**Zustand** es una librería para manejar el estado global de tu aplicación de manera simple y eficiente. Es como tener un "almacén central" donde guardas datos que necesitas en múltiples componentes.

### ¿Por qué usar Zustand?

**Problema sin gestión de estado global:**

- Componente A tiene datos que necesita Componente C
- Tienes que pasar los datos: A → B → C (prop drilling)
- Es complicado y difícil de mantener

**Solución con Zustand:**

- Los datos están en un "almacén central"
- Cualquier componente puede acceder directamente
- Cambios se reflejan automáticamente en todos los componentes

### ¿Cómo funciona Zustand?

**Flujo completo de Zustand:**

1. **Creación del Store**: `create()` define el almacén global
2. **Estado inicial**: Se establecen valores iniciales
3. **Acciones**: Se definen funciones para modificar el estado
4. **Suscripción**: Componentes se "suscriben" al store
5. **Evento**: Usuario interactúa con un componente
6. **Acción llamada**: Componente ejecuta una acción del store
7. **Estado actualizado**: Zustand actualiza el estado global
8. **Notificación**: Todos los componentes suscritos son notificados
9. **Re-renderizado**: Solo los componentes que usan ese dato se re-renderizan

**Analogía de la vida real:**

- **Store** = Estación de radio central
- **Estado** = Música que está sonando
- **Acciones** = DJ que cambia la música
- **Componentes** = Radios en diferentes casas
- **Suscripción** = Sintonizar la estación
- **Actualización** = Todas las radios escuchan la nueva música al mismo tiempo

**Ventajas de Zustand vs useState local:**

| useState (Local)              | Zustand (Global)              |
| ----------------------------- | ----------------------------- |
| Solo un componente accede     | Múltiples componentes acceden |
| Props drilling necesario      | Acceso directo                |
| Estado se pierde al desmontar | Estado persiste               |
| Difícil compartir lógica      | Lógica centralizada           |
| Re-renderizados innecesarios  | Re-renderizados optimizados   |

### Instalación

```bash
npm install zustand
```

### Ejemplo Básico: Contador Global

```jsx
// stores/contadorStore.js
import { create } from "zustand";

const useContadorStore = create((set) => ({
  // Estado inicial
  cuenta: 0,

  // Acciones para modificar el estado
  incrementar: () => set((state) => ({ cuenta: state.cuenta + 1 })),
  decrementar: () => set((state) => ({ cuenta: state.cuenta - 1 })),
  reiniciar: () => set({ cuenta: 0 }),
  establecerCuenta: (nuevaCuenta) => set({ cuenta: nuevaCuenta }),
}));

export default useContadorStore;
```

```jsx
// components/ContadorDisplay.jsx
import useContadorStore from "../stores/contadorStore";

const ContadorDisplay = () => {
  const cuenta = useContadorStore((state) => state.cuenta);

  return (
    <div>
      <h2>Cuenta actual: {cuenta}</h2>
    </div>
  );
};

export default ContadorDisplay;
```

```jsx
// components/ContadorControles.jsx
import useContadorStore from "../stores/contadorStore";

const ContadorControles = () => {
  const { incrementar, decrementar, reiniciar } = useContadorStore();

  return (
    <div>
      <button onClick={incrementar}>+</button>
      <button onClick={decrementar}>-</button>
      <button onClick={reiniciar}>Reiniciar</button>
    </div>
  );
};

export default ContadorControles;
```

### Ejemplo Avanzado: Tienda de Productos

```jsx
// stores/tiendaStore.js
import { create } from "zustand";

const useTiendaStore = create((set, get) => ({
  // Estado
  productos: [],
  carrito: [],
  usuario: null,
  cargando: false,

  // Acciones para productos
  obtenerProductos: async () => {
    set({ cargando: true });
    try {
      const respuesta = await fetch("https://fakestoreapi.com/products");
      const productos = await respuesta.json();
      set({ productos, cargando: false });
    } catch (error) {
      console.error("Error al obtener productos:", error);
      set({ cargando: false });
    }
  },

  // Acciones para carrito
  agregarAlCarrito: (producto) => {
    const { carrito } = get();
    const productoExistente = carrito.find((item) => item.id === producto.id);

    if (productoExistente) {
      set({
        carrito: carrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        ),
      });
    } else {
      set({
        carrito: [...carrito, { ...producto, cantidad: 1 }],
      });
    }
  },

  removerDelCarrito: (productoId) => {
    set({
      carrito: get().carrito.filter((item) => item.id !== productoId),
    });
  },

  actualizarCantidad: (productoId, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      get().removerDelCarrito(productoId);
      return;
    }

    set({
      carrito: get().carrito.map((item) =>
        item.id === productoId ? { ...item, cantidad: nuevaCantidad } : item
      ),
    });
  },

  limpiarCarrito: () => set({ carrito: [] }),

  // Getters calculados
  totalCarrito: () => {
    const { carrito } = get();
    return carrito.reduce(
      (total, item) => total + item.price * item.cantidad,
      0
    );
  },

  cantidadItems: () => {
    const { carrito } = get();
    return carrito.reduce((total, item) => total + item.cantidad, 0);
  },

  // Acciones para usuario
  iniciarSesion: (datosUsuario) => set({ usuario: datosUsuario }),
  cerrarSesion: () => set({ usuario: null, carrito: [] }),
}));

export default useTiendaStore;
```

```jsx
// components/ListaProductos.jsx
import { useEffect } from "react";
import useTiendaStore from "../stores/tiendaStore";

const ListaProductos = () => {
  const { productos, cargando, obtenerProductos, agregarAlCarrito } =
    useTiendaStore();

  useEffect(() => {
    obtenerProductos();
  }, [obtenerProductos]);

  if (cargando) return <div>Cargando productos...</div>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
      }}
    >
      {productos.map((producto) => (
        <div
          key={producto.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <img
            src={producto.image}
            alt={producto.title}
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />
          <h3>{producto.title}</h3>
          <p>${producto.price}</p>
          <button
            onClick={() => agregarAlCarrito(producto)}
            style={{
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Agregar al Carrito
          </button>
        </div>
      ))}
    </div>
  );
};

export default ListaProductos;
```

```jsx
// components/Carrito.jsx
import useTiendaStore from "../stores/tiendaStore";

const Carrito = () => {
  const {
    carrito,
    removerDelCarrito,
    actualizarCantidad,
    limpiarCarrito,
    totalCarrito,
    cantidadItems,
  } = useTiendaStore();

  const total = totalCarrito();
  const cantidad = cantidadItems();

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", margin: "20px" }}>
      <h2>Carrito de Compras ({cantidad} items)</h2>

      {carrito.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          {carrito.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                borderBottom: "1px solid #eee",
              }}
            >
              <div>
                <h4>{item.title}</h4>
                <p>
                  ${item.price} x {item.cantidad}
                </p>
              </div>
              <div>
                <button
                  onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                >
                  -
                </button>
                <span style={{ margin: "0 10px" }}>{item.cantidad}</span>
                <button
                  onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                >
                  +
                </button>
                <button
                  onClick={() => removerDelCarrito(item.id)}
                  style={{
                    marginLeft: "10px",
                    backgroundColor: "red",
                    color: "white",
                  }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}

          <div style={{ marginTop: "20px" }}>
            <h3>Total: ${total.toFixed(2)}</h3>
            <button onClick={limpiarCarrito}>Limpiar Carrito</button>
            <button
              style={{
                marginLeft: "10px",
                backgroundColor: "green",
                color: "white",
              }}
            >
              Proceder al Pago
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
```

### Persistencia de Datos

```jsx
// stores/persistentStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const usePersistedStore = create(
  persist(
    (set, get) => ({
      preferencias: {
        tema: "claro",
        idioma: "es",
      },
      historialCompras: [],

      cambiarTema: (nuevoTema) =>
        set((state) => ({
          preferencias: { ...state.preferencias, tema: nuevoTema },
        })),

      agregarCompra: (compra) =>
        set((state) => ({
          historialCompras: [...state.historialCompras, compra],
        })),
    }),
    {
      name: "app-storage", // nombre clave en localStorage
      getStorage: () => localStorage, // tipo de storage
    }
  )
);

export default usePersistedStore;
```

---

## Gestión de Estado con Redux

### ¿Qué es Redux?

**Redux** es una librería para manejar el estado global de aplicaciones JavaScript. Es como tener un **banco centralizado** donde todas las transacciones (cambios de estado) se procesan de manera predecible y controlada.

### ¿Por qué Redux vs Zustand?

**Redux** es más robusto pero también más complejo. Piensa en Redux como un **banco tradicional**:

- Tiene reglas estrictas y procedimientos formales
- Todo está documentado y auditado
- Es muy seguro pero requiere más papeleo
- Ideal para aplicaciones grandes y equipos grandes

**Zustand** es como una **billetera digital**:

- Más simple y directo
- Menos ceremonial
- Perfecto para aplicaciones pequeñas a medianas

### ¿Cómo funciona Redux?

**Analogía del Banco:**

- **Store** = El banco central donde se guarda todo el dinero (estado)
- **Action** = Formulario que llenas para hacer una transacción
- **Reducer** = Empleado del banco que procesa tu formulario
- **Dispatch** = Entregar el formulario al empleado
- **Selector** = Consultar tu saldo actual

**Flujo completo de Redux:**

1. **Componente necesita datos**: Lee del Store usando selectores
2. **Usuario interactúa**: Click, input, etc.
3. **Component dispatch action**: Envía una acción con tipo y datos
4. **Store recibe action**: Redux distribuye la acción a todos los reducers
5. **Reducer procesa**: Evalúa el tipo de acción y calcula nuevo estado
6. **Estado se actualiza**: Store guarda el nuevo estado
7. **Componentes se notifican**: Los que usan ese estado se re-renderizan
8. **UI se actualiza**: Cambios visibles para el usuario

**Flujo Visual:**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Component     │ →  │     Action      │ →  │     Store       │
│   dispatch()    │    │ {type, payload} │    │   distributes   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         ↑                                              ↓
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ UI Updates &    │ ←  │ State Updated   │ ←  │    Reducer      │
│ Re-render       │    │                 │    │   processes     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Conceptos Fundamentales de Redux

#### 1. Store (Almacén)

El **Store** es el contenedor único de todo el estado de tu aplicación.

```jsx
// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import contadorReducer from "./contadorSlice";
import usuarioReducer from "./usuarioSlice";

const store = configureStore({
  reducer: {
    contador: contadorReducer,
    usuario: usuarioReducer,
  },
});

export default store;
```

#### 2. Actions (Acciones)

Las **Actions** son objetos que describen QUÉ pasó (pero no CÓMO cambiar el estado).

```jsx
// Acción simple
const incrementar = {
  type: "contador/incrementar",
};

// Acción con datos (payload)
const establecerUsuario = {
  type: "usuario/establecer",
  payload: {
    nombre: "Juan",
    email: "juan@email.com",
  },
};
```

#### 3. Reducers (Reductores)

Los **Reducers** especifican CÓMO el estado cambia en respuesta a las acciones.

```jsx
// Reducer tradicional
function contadorReducer(state = { valor: 0 }, action) {
  switch (action.type) {
    case "contador/incrementar":
      return { valor: state.valor + 1 };
    case "contador/decrementar":
      return { valor: state.valor - 1 };
    default:
      return state;
  }
}
```

### Redux Toolkit (Forma Moderna)

**Redux Toolkit** es la forma oficial y moderna de escribir Redux. Simplifica mucho el código.

### Instalación

```bash
npm install @reduxjs/toolkit react-redux
```

### Configuración Básica

```jsx
// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import contadorSlice from "./contadorSlice";

const store = configureStore({
  reducer: {
    contador: contadorSlice,
  },
});

export default store;
```

```jsx
// src/main.jsx o src/index.js
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App";

function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default Root;
```

### Ejemplo Completo: Contador con Redux Toolkit

```jsx
// store/contadorSlice.js
import { createSlice } from "@reduxjs/toolkit";

const contadorSlice = createSlice({
  name: "contador",
  initialState: {
    valor: 0,
    historial: [],
  },
  reducers: {
    incrementar: (state) => {
      state.valor += 1;
      state.historial.push(`Incrementado a ${state.valor}`);
    },
    decrementar: (state) => {
      state.valor -= 1;
      state.historial.push(`Decrementado a ${state.valor}`);
    },
    incrementarPor: (state, action) => {
      const cantidad = action.payload;
      state.valor += cantidad;
      state.historial.push(`Incrementado por ${cantidad} a ${state.valor}`);
    },
    reiniciar: (state) => {
      state.valor = 0;
      state.historial.push("Contador reiniciado");
    },
    limpiarHistorial: (state) => {
      state.historial = [];
    },
  },
});

// Exportar actions
export const {
  incrementar,
  decrementar,
  incrementarPor,
  reiniciar,
  limpiarHistorial,
} = contadorSlice.actions;

// Exportar reducer
export default contadorSlice.reducer;
```

```jsx
// components/Contador.jsx
import { useSelector, useDispatch } from "react-redux";
import {
  incrementar,
  decrementar,
  incrementarPor,
  reiniciar,
} from "../store/contadorSlice";

const Contador = () => {
  // useSelector para leer del estado
  const valor = useSelector((state) => state.contador.valor);
  const historial = useSelector((state) => state.contador.historial);

  // useDispatch para enviar acciones
  const dispatch = useDispatch();

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", margin: "20px" }}>
      <h2>Contador Redux: {valor}</h2>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => dispatch(incrementar())}>+1</button>
        <button onClick={() => dispatch(decrementar())}>-1</button>
        <button onClick={() => dispatch(incrementarPor(5))}>+5</button>
        <button onClick={() => dispatch(reiniciar())}>Reiniciar</button>
      </div>

      <div>
        <h3>Historial:</h3>
        <ul style={{ maxHeight: "200px", overflowY: "scroll" }}>
          {historial.map((entrada, index) => (
            <li key={index}>{entrada}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Contador;
```

### Ejemplo Avanzado: Aplicación de Tareas

```jsx
// store/tareasSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk para cargar tareas desde API
export const cargarTareas = createAsyncThunk(
  "tareas/cargarTareas",
  async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=10"
    );
    return response.json();
  }
);

// Thunk para crear nueva tarea
export const crearTarea = createAsyncThunk(
  "tareas/crearTarea",
  async (nuevaTarea) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevaTarea),
    });
    return response.json();
  }
);

const tareasSlice = createSlice({
  name: "tareas",
  initialState: {
    items: [],
    filtro: "todas", // 'todas', 'completadas', 'pendientes'
    estado: "idle", // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
    estadisticas: {
      total: 0,
      completadas: 0,
      pendientes: 0,
    },
  },
  reducers: {
    // Acciones síncronas
    agregarTarea: (state, action) => {
      const nuevaTarea = {
        id: Date.now(),
        title: action.payload,
        completed: false,
        userId: 1,
      };
      state.items.push(nuevaTarea);
      state.estadisticas.total += 1;
      state.estadisticas.pendientes += 1;
    },

    toggleTarea: (state, action) => {
      const tarea = state.items.find((t) => t.id === action.payload);
      if (tarea) {
        tarea.completed = !tarea.completed;
        if (tarea.completed) {
          state.estadisticas.completadas += 1;
          state.estadisticas.pendientes -= 1;
        } else {
          state.estadisticas.completadas -= 1;
          state.estadisticas.pendientes += 1;
        }
      }
    },

    eliminarTarea: (state, action) => {
      const index = state.items.findIndex((t) => t.id === action.payload);
      if (index !== -1) {
        const tarea = state.items[index];
        state.items.splice(index, 1);
        state.estadisticas.total -= 1;
        if (tarea.completed) {
          state.estadisticas.completadas -= 1;
        } else {
          state.estadisticas.pendientes -= 1;
        }
      }
    },

    cambiarFiltro: (state, action) => {
      state.filtro = action.payload;
    },

    limpiarCompletadas: (state) => {
      const completadas = state.items.filter((t) => t.completed).length;
      state.items = state.items.filter((t) => !t.completed);
      state.estadisticas.total -= completadas;
      state.estadisticas.completadas = 0;
    },
  },
  extraReducers: (builder) => {
    // Manejar acciones asíncronas
    builder
      .addCase(cargarTareas.pending, (state) => {
        state.estado = "loading";
      })
      .addCase(cargarTareas.fulfilled, (state, action) => {
        state.estado = "succeeded";
        state.items = action.payload;
        // Calcular estadísticas
        state.estadisticas.total = action.payload.length;
        state.estadisticas.completadas = action.payload.filter(
          (t) => t.completed
        ).length;
        state.estadisticas.pendientes = action.payload.filter(
          (t) => !t.completed
        ).length;
      })
      .addCase(cargarTareas.rejected, (state, action) => {
        state.estado = "failed";
        state.error = action.error.message;
      })
      .addCase(crearTarea.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.estadisticas.total += 1;
        state.estadisticas.pendientes += 1;
      });
  },
});

// Selectores (funciones para extraer datos específicos del estado)
export const selectTodasLasTareas = (state) => state.tareas.items;
export const selectTareasVisibles = (state) => {
  const { items, filtro } = state.tareas;
  switch (filtro) {
    case "completadas":
      return items.filter((tarea) => tarea.completed);
    case "pendientes":
      return items.filter((tarea) => !tarea.completed);
    default:
      return items;
  }
};
export const selectEstadisticas = (state) => state.tareas.estadisticas;

export const {
  agregarTarea,
  toggleTarea,
  eliminarTarea,
  cambiarFiltro,
  limpiarCompletadas,
} = tareasSlice.actions;

export default tareasSlice.reducer;
```

```jsx
// components/ListaTareas.jsx
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  cargarTareas,
  crearTarea,
  agregarTarea,
  toggleTarea,
  eliminarTarea,
  cambiarFiltro,
  limpiarCompletadas,
  selectTareasVisibles,
  selectEstadisticas,
} from "../store/tareasSlice";

const ListaTareas = () => {
  const dispatch = useDispatch();
  const tareasVisibles = useSelector(selectTareasVisibles);
  const estadisticas = useSelector(selectEstadisticas);
  const { estado, error, filtro } = useSelector((state) => state.tareas);

  const [nuevaTarea, setNuevaTarea] = useState("");

  useEffect(() => {
    // Cargar tareas al montar el componente
    dispatch(cargarTareas());
  }, [dispatch]);

  const manejarAgregar = () => {
    if (nuevaTarea.trim()) {
      dispatch(agregarTarea(nuevaTarea));
      setNuevaTarea("");
    }
  };

  const manejarCrearAPI = () => {
    if (nuevaTarea.trim()) {
      dispatch(
        crearTarea({
          title: nuevaTarea,
          completed: false,
          userId: 1,
        })
      );
      setNuevaTarea("");
    }
  };

  if (estado === "loading") {
    return <div>Cargando tareas...</div>;
  }

  if (estado === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Lista de Tareas con Redux</h1>

      {/* Estadísticas */}
      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h3>Estadísticas</h3>
        <p>Total: {estadisticas.total}</p>
        <p>Completadas: {estadisticas.completadas}</p>
        <p>Pendientes: {estadisticas.pendientes}</p>
      </div>

      {/* Formulario para agregar tarea */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder="Nueva tarea..."
          style={{ padding: "8px", marginRight: "10px", width: "300px" }}
          onKeyPress={(e) => e.key === "Enter" && manejarAgregar()}
        />
        <button onClick={manejarAgregar} style={{ padding: "8px 16px" }}>
          Agregar Local
        </button>
        <button
          onClick={manejarCrearAPI}
          style={{ padding: "8px 16px", marginLeft: "5px" }}
        >
          Crear en API
        </button>
      </div>

      {/* Filtros */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => dispatch(cambiarFiltro("todas"))}
          style={{
            padding: "8px 16px",
            backgroundColor: filtro === "todas" ? "#007bff" : "#f8f9fa",
            color: filtro === "todas" ? "white" : "black",
            border: "1px solid #ccc",
            marginRight: "5px",
          }}
        >
          Todas
        </button>
        <button
          onClick={() => dispatch(cambiarFiltro("pendientes"))}
          style={{
            padding: "8px 16px",
            backgroundColor: filtro === "pendientes" ? "#007bff" : "#f8f9fa",
            color: filtro === "pendientes" ? "white" : "black",
            border: "1px solid #ccc",
            marginRight: "5px",
          }}
        >
          Pendientes
        </button>
        <button
          onClick={() => dispatch(cambiarFiltro("completadas"))}
          style={{
            padding: "8px 16px",
            backgroundColor: filtro === "completadas" ? "#007bff" : "#f8f9fa",
            color: filtro === "completadas" ? "white" : "black",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        >
          Completadas
        </button>
        <button
          onClick={() => dispatch(limpiarCompletadas())}
          style={{
            padding: "8px 16px",
            backgroundColor: "#dc3545",
            color: "white",
          }}
        >
          Limpiar Completadas
        </button>
      </div>

      {/* Lista de tareas */}
      <div>
        {tareasVisibles.length === 0 ? (
          <p>No hay tareas para mostrar</p>
        ) : (
          tareasVisibles.map((tarea) => (
            <div
              key={tarea.id}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
                border: "1px solid #eee",
                marginBottom: "5px",
                borderRadius: "4px",
                backgroundColor: tarea.completed ? "#f0f8f0" : "white",
              }}
            >
              <input
                type="checkbox"
                checked={tarea.completed}
                onChange={() => dispatch(toggleTarea(tarea.id))}
                style={{ marginRight: "10px" }}
              />
              <span
                style={{
                  flex: 1,
                  textDecoration: tarea.completed ? "line-through" : "none",
                  color: tarea.completed ? "#666" : "black",
                }}
              >
                {tarea.title}
              </span>
              <button
                onClick={() => dispatch(eliminarTarea(tarea.id))}
                style={{
                  padding: "4px 8px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                Eliminar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListaTareas;
```

### Redux DevTools

Las **Redux DevTools** son esenciales para debuggear tu aplicación Redux.

```jsx
// store/store.js - Ya viene incluido en configureStore
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    // tus reducers...
  },
  // DevTools se activan automáticamente en desarrollo
});
```

**Instalar la extensión del navegador:**

1. Ve a Chrome Web Store
2. Busca "Redux DevTools"
3. Instala la extensión
4. Ahora puedes ver todas las acciones y cambios de estado

### Middleware y Thunks

**Middleware** son funciones que se ejecutan entre el dispatch de una acción y que llegue al reducer.

```jsx
// store/api.js - Servicio para llamadas a API
const api = {
  obtenerUsuarios: async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) throw new Error("Error al obtener usuarios");
    return response.json();
  },

  crearUsuario: async (usuario) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    });
    if (!response.ok) throw new Error("Error al crear usuario");
    return response.json();
  },
};

export default api;
```

```jsx
// store/usuariosSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";

// Thunk asíncrono con manejo de errores
export const obtenerUsuarios = createAsyncThunk(
  "usuarios/obtenerUsuarios",
  async (_, { rejectWithValue }) => {
    try {
      return await api.obtenerUsuarios();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const crearUsuario = createAsyncThunk(
  "usuarios/crearUsuario",
  async (nuevoUsuario, { rejectWithValue }) => {
    try {
      return await api.crearUsuario(nuevoUsuario);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const usuariosSlice = createSlice({
  name: "usuarios",
  initialState: {
    lista: [],
    estado: "idle", // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {
    limpiarError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Obtener usuarios
      .addCase(obtenerUsuarios.pending, (state) => {
        state.estado = "loading";
        state.error = null;
      })
      .addCase(obtenerUsuarios.fulfilled, (state, action) => {
        state.estado = "succeeded";
        state.lista = action.payload;
      })
      .addCase(obtenerUsuarios.rejected, (state, action) => {
        state.estado = "failed";
        state.error = action.payload;
      })
      // Crear usuario
      .addCase(crearUsuario.fulfilled, (state, action) => {
        state.lista.push(action.payload);
      })
      .addCase(crearUsuario.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { limpiarError } = usuariosSlice.actions;
export default usuariosSlice.reducer;
```

### Patrones Avanzados de Redux

#### 1. Normalization (Normalización)

Para manejar datos relacionales de manera eficiente:

```jsx
// store/entitiesSlice.js
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

// Entity Adapter para normalizar datos
const usuariosAdapter = createEntityAdapter({
  selectId: (usuario) => usuario.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const usuariosSlice = createSlice({
  name: "usuarios",
  initialState: usuariosAdapter.getInitialState({
    estado: "idle",
    error: null,
  }),
  reducers: {
    usuarioAgregado: usuariosAdapter.addOne,
    usuarioActualizado: usuariosAdapter.updateOne,
    usuarioEliminado: usuariosAdapter.removeOne,
    usuariosRecibidos: usuariosAdapter.setAll,
  },
});

// Selectores generados automáticamente
export const {
  selectAll: selectTodosLosUsuarios,
  selectById: selectUsuarioPorId,
  selectIds: selectIdsUsuarios,
} = usuariosAdapter.getSelectors((state) => state.usuarios);

export const { usuarioAgregado, usuarioActualizado, usuarioEliminado } =
  usuariosSlice.actions;
export default usuariosSlice.reducer;
```

#### 2. Selectores Memoizados

```jsx
// store/selectors.js
import { createSelector } from "@reduxjs/toolkit";

// Selector básico
const selectTareas = (state) => state.tareas.items;
const selectFiltro = (state) => state.tareas.filtro;

// Selector memoizado que solo se recalcula si cambian las dependencias
export const selectTareasVisibles = createSelector(
  [selectTareas, selectFiltro],
  (tareas, filtro) => {
    console.log("Calculando tareas visibles..."); // Solo se ejecuta cuando es necesario
    switch (filtro) {
      case "completadas":
        return tareas.filter((tarea) => tarea.completed);
      case "pendientes":
        return tareas.filter((tarea) => !tarea.completed);
      default:
        return tareas;
    }
  }
);

// Selector con parámetros
export const selectTareaPorId = createSelector(
  [selectTareas, (state, tareaId) => tareaId],
  (tareas, tareaId) => tareas.find((tarea) => tarea.id === tareaId)
);
```

### Comparación: Redux vs Zustand vs useState

| Aspecto                   | useState   | Zustand  | Redux      |
| ------------------------- | ---------- | -------- | ---------- |
| **Complejidad**           | Muy simple | Simple   | Complejo   |
| **Curva de aprendizaje**  | Baja       | Baja     | Alta       |
| **Código boilerplate**    | Ninguno    | Mínimo   | Mucho      |
| **DevTools**              | No         | Sí       | Excelentes |
| **Middleware**            | No         | Limitado | Extenso    |
| **Escalabilidad**         | Baja       | Media    | Alta       |
| **Predictibilidad**       | Media      | Alta     | Muy alta   |
| **Testing**               | Fácil      | Fácil    | Muy fácil  |
| **Time travel debugging** | No         | No       | Sí         |
| **Tamaño del bundle**     | 0kb        | ~1kb     | ~10kb      |

### ¿Cuándo usar cada uno?

**useState:**

- Componentes individuales
- Estado simple y local
- Prototipos rápidos

**Zustand:**

- Aplicaciones pequeñas a medianas
- Equipos pequeños
- Necesitas simplicidad con estado global

**Redux:**

- Aplicaciones grandes y complejas
- Equipos grandes
- Necesitas debugging avanzado
- Lógica de estado muy compleja
- Aplicaciones críticas que requieren predictibilidad total

### Mejores Prácticas de Redux

#### 1. Estructura de Archivos

```
src/
├── store/
│   ├── index.js          # Configuración del store
│   ├── slices/
│   │   ├── authSlice.js
│   │   ├── tareasSlice.js
│   │   └── usuariosSlice.js
│   ├── selectors/
│   │   ├── authSelectors.js
│   │   └── tareasSelectors.js
│   └── middleware/
│       └── logger.js
```

#### 2. Nomenclatura Consistente

```jsx
// Nombres de acciones descriptivos
const tareasSlice = createSlice({
  name: "tareas",
  reducers: {
    tareaAgregada: (state, action) => {
      /* ... */
    },
    tareaCompletada: (state, action) => {
      /* ... */
    },
    tareaEliminada: (state, action) => {
      /* ... */
    },
    filtroActualizado: (state, action) => {
      /* ... */
    },
  },
});
```

#### 3. Estado Inmutable

```jsx
// ✅ Correcto - Redux Toolkit usa Immer internamente
const tareasSlice = createSlice({
  name: "tareas",
  reducers: {
    tareaActualizada: (state, action) => {
      const tarea = state.items.find((t) => t.id === action.payload.id);
      if (tarea) {
        tarea.completed = action.payload.completed;
      }
    },
  },
});

// ❌ Incorrecto en Redux tradicional (pero OK en Redux Toolkit)
// state.items.push(nuevaTarea); // Esto mutatía el estado
```

#### 4. Separar Lógica de UI

```jsx
// hooks/useTareas.js - Custom hook para lógica de tareas
import { useSelector, useDispatch } from "react-redux";
import { agregarTarea, toggleTarea, eliminarTarea } from "../store/tareasSlice";

export const useTareas = () => {
  const dispatch = useDispatch();
  const tareas = useSelector((state) => state.tareas.items);

  const agregar = (texto) => {
    dispatch(agregarTarea(texto));
  };

  const toggle = (id) => {
    dispatch(toggleTarea(id));
  };

  const eliminar = (id) => {
    dispatch(eliminarTarea(id));
  };

  return {
    tareas,
    agregar,
    toggle,
    eliminar,
  };
};
```

### Testing con Redux

```jsx
// __tests__/tareasSlice.test.js
import tareasReducer, { agregarTarea, toggleTarea } from "../store/tareasSlice";

describe("tareasSlice", () => {
  const estadoInicial = {
    items: [],
    filtro: "todas",
    estado: "idle",
    error: null,
  };

  test("debería agregar una tarea", () => {
    const resultado = tareasReducer(estadoInicial, agregarTarea("Nueva tarea"));

    expect(resultado.items).toHaveLength(1);
    expect(resultado.items[0].title).toBe("Nueva tarea");
    expect(resultado.items[0].completed).toBe(false);
  });

  test("debería completar una tarea", () => {
    const estadoConTarea = {
      ...estadoInicial,
      items: [{ id: 1, title: "Tarea test", completed: false }],
    };

    const resultado = tareasReducer(estadoConTarea, toggleTarea(1));

    expect(resultado.items[0].completed).toBe(true);
  });
});
```

---

## Ejercicios Prácticos

### Ejercicio 1: Lista de Tareas con Zustand

**Objetivo**: Crear una aplicación de lista de tareas usando Zustand para el estado global.

```jsx
// stores/tareasStore.js
import { create } from "zustand";

const useTareasStore = create((set, get) => ({
  tareas: [],
  filtro: "todas", // 'todas', 'completadas', 'pendientes'

  agregarTarea: (texto) =>
    set((state) => ({
      tareas: [
        ...state.tareas,
        {
          id: Date.now(),
          texto,
          completada: false,
          fechaCreacion: new Date(),
        },
      ],
    })),

  toggleTarea: (id) =>
    set((state) => ({
      tareas: state.tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
      ),
    })),

  eliminarTarea: (id) =>
    set((state) => ({
      tareas: state.tareas.filter((tarea) => tarea.id !== id),
    })),

  cambiarFiltro: (nuevoFiltro) => set({ filtro: nuevoFiltro }),

  tareasVisibles: () => {
    const { tareas, filtro } = get();
    switch (filtro) {
      case "completadas":
        return tareas.filter((tarea) => tarea.completada);
      case "pendientes":
        return tareas.filter((tarea) => !tarea.completada);
      default:
        return tareas;
    }
  },
}));

export default useTareasStore;
```

### Ejercicio 2: Dashboard con Múltiples APIs

**Objetivo**: Crear un dashboard que consuma múltiples APIs y muestre diferentes tipos de datos.

```jsx
// hooks/useDashboard.js
import { useState, useEffect } from "react";

const useDashboard = () => {
  const [datos, setDatos] = useState({
    clima: null,
    noticias: [],
    cotizaciones: {},
    cargando: true,
  });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // Simular múltiples llamadas a APIs
        const [climaRes, noticiasRes, cotizacionesRes] = await Promise.all([
          fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=Madrid&appid=TU_API_KEY"
          ),
          fetch(
            "https://newsapi.org/v2/top-headlines?country=es&apiKey=TU_API_KEY"
          ),
          fetch("https://api.exchangerate-api.com/v4/latest/USD"),
        ]);

        const clima = await climaRes.json();
        const noticias = await noticiasRes.json();
        const cotizaciones = await cotizacionesRes.json();

        setDatos({
          clima,
          noticias: noticias.articles?.slice(0, 5) || [],
          cotizaciones: cotizaciones.rates || {},
          cargando: false,
        });
      } catch (error) {
        console.error("Error cargando datos del dashboard:", error);
        setDatos((prev) => ({ ...prev, cargando: false }));
      }
    };

    cargarDatos();
  }, []);

  return datos;
};

export default useDashboard;
```

---

## Mejores Prácticas

### 1. Estructura de Carpetas

```
src/
├── components/
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   └── Modal.jsx
│   ├── layout/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── Sidebar.jsx
│   └── features/
│       ├── auth/
│       ├── productos/
│       └── carrito/
├── hooks/
│   ├── useApi.js
│   ├── useLocalStorage.js
│   └── useDebounce.js
├── stores/
│   ├── authStore.js
│   ├── productosStore.js
│   └── carritoStore.js
├── services/
│   ├── api.js
│   └── auth.js
├── utils/
│   ├── constants.js
│   ├── helpers.js
│   └── validators.js
└── styles/
    ├── globals.css
    └── components/
```

### 2. Convenciones de Nomenclatura

- **Componentes**: PascalCase (`MiComponente`)
- **Hooks**: camelCase con prefijo "use" (`useContador`)
- **Stores**: camelCase con sufijo "Store" (`userStore`)
- **Funciones**: camelCase (`manejarClick`)
- **Constantes**: UPPER_SNAKE_CASE (`API_BASE_URL`)

### 3. Tips de Rendimiento

```jsx
// ✅ Buena práctica: Memorizar componentes pesados
import { memo } from "react";

const ComponentePesado = memo(({ datos, onCambio }) => {
  // Renderizado costoso
  return <div>{/* contenido complejo */}</div>;
});

// ✅ Buena práctica: Memorizar cálculos costosos
import { useMemo } from "react";

const MiComponente = ({ items }) => {
  const itemsFiltrados = useMemo(() => {
    return items
      .filter((item) => item.activo)
      .sort((a, b) => a.nombre.localeCompare(b.nombre));
  }, [items]);

  return <Lista items={itemsFiltrados} />;
};

// ✅ Buena práctica: Memorizar funciones para evitar re-renderizados
import { useCallback } from "react";

const FormularioComplejo = () => {
  const [datos, setDatos] = useState({});

  const manejarCambio = useCallback((campo, valor) => {
    setDatos((prev) => ({ ...prev, [campo]: valor }));
  }, []);

  return <Formulario onChange={manejarCambio} />;
};
```

---

## Conclusión

Esta guía te ha proporcionado una base sólida para entender React desde los conceptos más básicos hasta técnicas avanzadas:

1. **Componentes**: Los bloques de construcción fundamentales
2. **Props y Estado**: Cómo manejar datos en tus componentes
3. **Hooks**: Herramientas poderosas para añadir funcionalidad
4. **APIs**: Cómo conectar tu aplicación con el mundo exterior
5. **Zustand**: Gestión eficiente del estado global (simple)
6. **Redux**: Gestión robusta del estado global (complejo pero potente)
7. **Client Side Rendering**: Entendiendo cómo funciona React en el navegador

### Próximos Pasos

1. **Practica** con proyectos pequeños
2. **Experimenta** con diferentes APIs
3. **Explora** librerías del ecosistema React
4. **Aprende** sobre testing con Jest y React Testing Library
5. **Considera** frameworks como Next.js para aplicaciones más complejas

¡Recuerda que la programación se aprende practicando! Comienza con proyectos simples y ve incrementando la complejidad gradualmente.

---

_Esta guía está diseñada para principiantes y cubre los conceptos esenciales de React. Para más información, consulta la [documentación oficial de React](https://react.dev/)._
