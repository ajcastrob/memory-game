import createCard from "./Cards";

let nameUser = localStorage.getItem("nameUser");
nameUser = JSON.parse(nameUser);

//Clase del juego de memoria.
class MemoryGame {
  //Constructor recibe el elemento card y el reloj
  constructor(cards, stopwatch) {
    this.cards = cards;
    this.stopwatch = stopwatch;
    //Guardamos la función para evitar bugs.
    this.handlers = new Map(); //para guardar la función de los clicks

    //Definir las demás variables.
    this.hasFlippedCard = false;
    this.lockBoard = false;
    this.counter = 0;
    this.firstCard = null;
    this.secondCard = null;
    this.started = false;
    this.notificacion = new AWN(); //para las notificaciones

    //Se llama para ejecutarse al inicio.
    this.init();
  }

  init() {
    const savedState = this.loadState(); //intentar cargar estado guardado.

    if (savedState) {
      this.restoreState(savedState); //si hay estado, restaurarlo.
    } else {
      this.shuffle(); //si no hay estado, empezar de nuevo.
    }

    this.addEvents();
  }

  //Guardar estado.
  savedState() {
    const cardOrders = [];
    const matchedCards = [];

    this.cards.forEach((card) => {
      cardOrders.push(card.style.order); //guardar el order de la carta.
      matchedCards.push(card.classList.contains("flip") ? 1 : 0); // comprobar las cartas volteadas
    });

    const state = {
      cardOrders, //array con el order de las cartas.
      matchedCards, //array de 0s y 1s: si la carta está emparejada.
      counter: this.counter,
      time: {
        ms: this.stopwatch.ms,
        sec: this.stopwatch.sec,
        min: this.stopwatch.min,
      },
      started: this.started,
    };

    //Guardar en local storage.
    localStorage.setItem("memoryGameState", JSON.stringify(state));
  }

  //Cargar la data de localstorage
  loadState() {
    const raw = localStorage.getItem("memoryGameState"); //comprobar si hay data.
    return raw ? JSON.parse(raw) : null; //devolver la data o null si no hay nada.
  }

  //Restaurar el tablero de juego.
  restoreState(state) {
    //restaurar el orden visual de la cartas.
    this.cards.forEach((card, index) => {
      card.style.order = state.cardOrders[index];

      //Si la carta estaba emparejada, voltearla y desactivarla.
      if (state.matchedCards[index] === 1) {
        card.classList.add("flip");
      }
    });

    //Restaurar el contador de pares.
    this.counter = state.counter;

    //Restaurar el tiempo del cronómetro
    this.stopwatch.ms = state.time.ms;
    this.stopwatch.sec = state.time.sec;
    this.stopwatch.min = state.time.min;

    //Mostrar el tiempo restaurado en pantalla.
    const malt = this.stopwatch.pad(state.time.min);
    const salt = this.stopwatch.pad(state.time.sec);
    const msalt = this.stopwatch.pad(state.time.ms);
    this.stopwatch.update(`${malt}:${salt}:${msalt}`);

    //Si el juego estaba en curso reanudar el reloj
    if (state.started) {
      this.stopwatch.resume();
      this.started = true;
    }
  }

  //addEvents hace que comience el reloj a partir del click.
  addEvents() {
    this.cards.forEach((card) => {
      //Si la carta ya estaba emparejada, no le ponemos evento.
      if (card.classList.contains("flip")) return;

      const handler = () => {
        if (!this.started) {
          this.stopwatch.start();
          this.notificacion.info(`¡Empezamos ${nameUser.name}!`, {
            labels: {
              info: "Game starts",
            },
            icons: {
              info: "puzzle-piece",
            },
          });
          this.started = true;
        }

        this.flipCard(card);
      };
      this.handlers.set(card, handler);
      card.addEventListener("click", handler);
    });
  }

  //flipCard altera el css para permitir el efecto de voltear la carta.
  flipCard(card) {
    if (this.lockBoard) return;
    if (card === this.firstCard) return;

    card.classList.toggle("flip");

    if (!this.hasFlippedCard) {
      //first click
      this.hasFlippedCard = true;
      this.firstCard = card;
      return;
    }

    this.secondCard = card;
    this.checkForMatch();
  }

  checkForMatch() {
    if (
      this.firstCard.dataset.framework === this.secondCard.dataset.framework
    ) {
      this.disableCards();
    } else {
      this.unflipCards();
    }
  }

  disableCards() {
    this.firstCard.removeEventListener(
      "click",
      this.handlers.get(this.firstCard),
    );
    this.secondCard.removeEventListener(
      "click",
      this.handlers.get(this.secondCard),
    );

    this.counter++;

    this.savedState(); //Guardar el estado del juego al encontrar pareja.

    //Dividir el contador por la mitad(pares) y llamar a la función que acaba el juego.
    if (this.counter === this.cards.length / 2) {
      this.finishGame();
    }
    this.resetBoard();
  }

  unflipCards() {
    this.lockBoard = true;

    setTimeout(() => {
      this.firstCard.classList.remove("flip");
      this.secondCard.classList.remove("flip");

      this.resetBoard();
    }, 2000);
  }

  resetBoard() {
    this.hasFlippedCard = false;
    this.lockBoard = false;
    this.firstCard = null;
    this.secondCard = null;
  }

  finishGame() {
    this.stopwatch.stop();
    this.started = false;

    localStorage.removeItem("memoryGameState"); //Limpiar al terminar el juego.

    let time = document.getElementById("timer");

    time = time.textContent;
    this.notificacion.success(`¡Lo lograste ${nameUser.name}!`, {
      labels: {
        success: "¡Win!",
      },
      icons: {
        success: "hand-peace",
      },
    });
    this.notificacion.info(`Tu tiempo fue ${time}`, {
      labels: {
        info: "¡Gran tiempo!",
      },
      icons: {
        info: "clock",
      },
    });
    this.stopwatch.update("00:00:00");
  }

  //shuffle hace un barajeo de las cartas con el atributo order de css.
  shuffle() {
    this.cards.forEach((card) => {
      const randomPos = Math.floor(Math.random() * this.cards.length);
      card.style.order = randomPos;
    });
  }

  static resetGame() {
    localStorage.removeItem("memoryGameState"); //Limpiar al reiniciar.
    //Hacer un reload de la página.
    location.reload();
  }
}

export default MemoryGame;
