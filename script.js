// variables 
let cubos = document.querySelectorAll(".cubos"); 
let mostrarTurno = document.getElementById("mostrarTurno"); 
let winner = document.getElementById("winner"); 
let empate = document.getElementById("empate"); 
let contadorHumano = document.getElementById("contadorHumano"); 
let contadorBot = document.getElementById("contadorBot"); 
let juegoTerminado = false; // Variable para controlar si el juego ha terminado
let turno = "X"; // Variable para llevar el control del turno

// Inicialización de contadores desde localStorage o por defecto a 0
let contadorB = parseInt(localStorage.getItem("bot")) || 0;
let contadorH = parseInt(localStorage.getItem("humano")) || 0;

// Actualiza los elementos del contador con los valores recuperados
contadorBot.innerHTML = contadorB;
contadorHumano.innerHTML = contadorH;

// Mostrar turno inicial
mostrarTurno.innerHTML = "Turno X";

// Añadir evento click a cada celda del tablero
for (let i = 0; i < cubos.length; i++) {
  cubos[i].addEventListener("click", function () {
    if (cubos[i].innerHTML === "" && !juegoTerminado) {
      cubos[i].innerHTML = turno; // Marca la celda con el turno actual
      verificarVictoria(); // Verifica si hay un ganador después de la jugada
      if (!juegoTerminado) {
        turno = turno === "X" ? "O" : "X"; // Cambia el turno
        mostrarTurno.innerHTML = `Turno ${turno}`; // Actualiza el mensaje de turno
        setTimeout(randomBot, 400); // Llama a la función del bot después de 400ms
      }
    }
  });
}

// Función para el movimiento del bot
function randomBot() {
  let validCells = Array.from(cubos).filter((cell) => cell.innerHTML === ""); // Filtra celdas vacías
  if (validCells.length === 0) return; // Si no hay celdas vacías, termina la función

  let randomCell = validCells[Math.floor(Math.random() * validCells.length)]; // Selecciona una celda vacía aleatoriamente
  randomCell.innerHTML = "O"; // Marca la celda con "O"
  turno = "X"; // Cambia el turno al jugador humano
  mostrarTurno.innerHTML = "Turno X"; // Actualiza el mensaje de turno
  verificarVictoria(); // Verifica si hay un ganador después del movimiento del bot
}

// Función para verificar si hay un ganador
function verificarVictoria() {
  const tablero = Array.from(cubos).map((cubos) => cubos.textContent); // Obtiene el contenido de cada celda en el tablero
  let ganador = false;

  // Verificación de ganador horizontal
  for (let i = 0; i < 9; i += 3) {
    if (
      tablero[i] &&
      tablero[i] === tablero[i + 1] &&
      tablero[i] === tablero[i + 2]
    ) {
      ganador = tablero[i];
      break;
    }
  }

  // Verificación de ganador vertical
  for (let i = 0; i < 3; i++) {
    if (
      tablero[i] &&
      tablero[i] === tablero[i + 3] &&
      tablero[i] === tablero[i + 6]
    ) {
      ganador = tablero[i];
      break;
    }
  }

  // Verificación de ganador diagonal
  if (tablero[0] && tablero[0] === tablero[4] && tablero[0] === tablero[8]) {
    ganador = tablero[0];
  }

  if (tablero[2] && tablero[2] === tablero[4] && tablero[2] === tablero[6]) {
    ganador = tablero[2];
  }

  // Si hay un ganador, actualiza el estado del juego y los contadores
  if (ganador) {
    juegoTerminado = true;
    winner.innerHTML = `Winner: ${ganador}`; // Muestra el ganador
    if (ganador === "X") {
      contadorH++;
      localStorage.setItem("humano", contadorH); // Guarda el nuevo conteo en localStorage
      contadorHumano.innerHTML = contadorH; // Actualiza el contador del jugador humano
    } else if (ganador === "O") {
      contadorB++;
      localStorage.setItem("bot", contadorB); // Guarda el nuevo conteo en localStorage
      contadorBot.innerHTML = contadorB; // Actualiza el contador del bot
    }
  } else if (!tablero.includes("")) { // verifica si hay celdas vacias 
    juegoTerminado = true;
    empate.innerHTML = "Empate"; // Muestra un mensaje de empate si no hay más celdas vacías
  }
}

// Botón de reinicio del juego
let btn = document.querySelector("#btn");
btn.addEventListener("click", function () {
  // Reinicia el estado del juego
  for (let i = 0; i < cubos.length; i++) {
    cubos[i].innerHTML = ""; // Limpia todas las celdas
  }
  turno = "X"; // Reinicia el turno a X
  mostrarTurno.innerHTML = "Turno X"; // Actualiza el mensaje de turno
  winner.innerHTML = ""; // Limpia el mensaje del ganador
  empate.innerHTML = ""; // Limpia el mensaje del empate
  juegoTerminado = false; // Marca el juego como no terminado
});
