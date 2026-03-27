const formulario = document.getElementById("game-form");

function getNameUser(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target));
  localStorage.setItem("nameUser", JSON.stringify(data));
  window.location = "game.html";
}

if (formulario) {
  formulario.addEventListener("submit", getNameUser);
}

export default getNameUser;
