# Memory Game

Proyecto frontend desarrollado con Vite, JavaScript y Sass. La aplicación tiene una pantalla de inicio para registrar el nombre del jugador y una pantalla de juego con un tablero de memoria, cronómetro, reinicio de partida y persistencia básica con `localStorage`.

## Características

- Formulario de entrada para guardar el nombre del jugador.
- Navegación desde la portada a la pantalla del juego.
- Tablero de cartas con lógica de volteo y comprobación de parejas.
- Cronómetro que empieza con el primer clic.
- Mensajes visuales con `AWN` al comenzar y al terminar la partida.
- Persistencia parcial del estado del juego en `localStorage`.
- Botón para reiniciar la partida.

## Tecnologías

- JavaScript ES Modules
- Vite
- Sass
- `gh-pages` para despliegue
- `AWN` para notificaciones

## Requisitos

- Node.js
- npm

## Instalación

```bash
npm install
```

## Scripts disponibles

```bash
npm run dev
```

Levanta el proyecto en desarrollo con Vite.

```bash
npm run build
```

Genera la versión de producción en `dist/`.

```bash
npm run preview
```

Previsualiza localmente la build de producción.

```bash
npm run deploy
```

Publica `dist/` usando `gh-pages`.

## Estructura del proyecto

```text
memory-game/
├── index.html
├── game.html
├── package.json
├── src/
│   ├── main.js
│   ├── class/
│   │   ├── MemoryGame.js
│   │   ├── Timer.js
│   │   └── Cards.js
│   └── utils/
│       └── form.js
├── sass/
│   ├── abstracts/
│   ├── base/
│   ├── components/
│   ├── layout/
│   ├── pages/
│   ├── themes/
│   └── main.scss
└── notifications/
```

## Flujo de la aplicación

### 1. Pantalla de inicio

`index.html` muestra el formulario principal. El archivo `src/utils/form.js`:

- captura el evento `submit`
- convierte los datos del formulario a objeto con `FormData`
- guarda el nombre en `localStorage` bajo la clave `nameUser`
- redirige a `game.html`

### 2. Pantalla del juego

`game.html` contiene:

- el tablero con las cartas
- el cronómetro
- el botón de reinicio

La inicialización del juego se hace desde `src/main.js`.

## Lógica principal

### `src/class/MemoryGame.js`

Clase encargada de la lógica del memory game:

- registra eventos `click` en cada carta
- arranca el cronómetro al primer clic
- compara parejas usando `data-framework`
- bloquea temporalmente el tablero mientras se resuelve una jugada fallida
- elimina listeners de cartas ya acertadas
- guarda y recupera parte del estado desde `localStorage`
- muestra notificaciones de inicio y victoria

También usa el nombre guardado previamente para personalizar mensajes al jugador.

### `src/class/Timer.js`

Gestiona el cronómetro:

- `start()` reinicia y comienza la cuenta
- `stop()` detiene el intervalo
- `resume()` reanuda la cuenta tras restaurar una partida
- `update()` pinta el tiempo en el elemento `#timer`

### `src/utils/form.js`

Gestiona el formulario de entrada y protege el `addEventListener` comprobando que el formulario exista en la página actual.

### `src/class/Cards.js`

Contiene una función `createCard()` para generar cartas dinámicamente, aunque en el estado actual del proyecto el tablero ya está escrito directamente en `game.html` y esa función no se está usando.

## Persistencia

El proyecto usa `localStorage` para dos cosas:

- `nameUser`: guarda el nombre introducido en la portada
- `memoryGameState`: guarda orden de cartas, parejas acertadas, contador y tiempo

## Estilos

Los estilos están organizados con Sass por capas:

- `abstracts`: variables, funciones y mixins
- `base`: estilos base y tipografía
- `components`: componentes reutilizables
- `layout`: estructura principal de pantalla y juego
- `pages`: estilos específicos de páginas
- `themes`: temas

## Estado actual y notas técnicas

- El proyecto compila correctamente con `npm run build`.
- Durante la build aparecen avisos porque `notifications/index.var.js` se carga como script clásico y porque algunos recursos de `notifications/` se resuelven en tiempo de ejecución.
- `src/class/Cards.js` está presente pero no forma parte del flujo actual.
- `src/main.js` concentra la inicialización de varias partes de la app; si el proyecto sigue creciendo, conviene separar la lógica de la portada y la lógica del juego por página.

## Ideas de mejora

- Separar entradas JS para `index.html` y `game.html`.
- Guardar también el estado de cartas temporalmente volteadas.
- Añadir tests de la lógica del juego.
- Mejorar el barajado para evitar posiciones repetidas.
- Mostrar el nombre del jugador en la interfaz además de las notificaciones.

## Autoría

Proyecto realizado como práctica de un juego de memoria en JavaScript con Vite.
