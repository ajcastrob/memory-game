import "../sass/main.scss";
import Stopwatch from "./class/Timer";
import MemoryGame from "./class/MemoryGame";
import getNameUser from "./utils/form";

//Instanciar los objetos del juego. El reloj y el juego.
const cards = document.querySelectorAll(".memory-card");
//Botón para reiniciar el juego.
const resetBotton = document.getElementById("btn");

if (cards.length > 0) {
  let timer = new Stopwatch();
  const game = new MemoryGame(cards, timer);
  let nameUser = localStorage.getItem("nameUser");
  nameUser = JSON.parse(nameUser);
  let titleUser = document.getElementById("title-info-user");
  let span = document.createElement("span");
  span.textContent = " " + nameUser.name + "!";
  titleUser.appendChild(span);
}
if (resetBotton) {
  resetBotton.addEventListener("click", MemoryGame.resetGame);
}
