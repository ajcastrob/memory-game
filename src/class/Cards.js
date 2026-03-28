//Seleccionar el tablero

function createCard() {
  const framework = ["bunny", "dog", "feet", "rayo", "ice", "person"];
  const frameworks = [...framework, ...framework];
  frameworks.sort();
  const borderGame = document.querySelector(".border-game");

  for (let i = 0; i < frameworks.length; i++) {
    //Crear el div.
    const divCard = document.createElement("div");
    divCard.classList.add("memory-card");
    divCard.setAttribute("data-framework", frameworks[i]);

    //Crear la primera imagen
    const img1 = document.createElement("img");
    img1.src = `./assets/${frameworks[i]}.svg`;
    img1.alt = frameworks[i];
    img1.classList.add("front-face");

    //crear el reverso.
    const img2 = document.createElement("img");
    img2.src = "./assets/backcard.svg";
    img2.alt = "backcard";
    img2.classList.add("back-face");

    divCard.append(img1);
    divCard.append(img2);

    borderGame.append(divCard);
  }

  borderGame.style.height = "400px";
  borderGame.style.width = "70%";
  borderGame.style.marginBottom = "400px";

  return borderGame;
}

export default createCard;
