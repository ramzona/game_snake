const game = document.getElementById("game");
const status = document.getElementById("status");
const scoreDisplay = document.getElementById("score");
const difficultySelect = document.getElementById("difficulty");
const restartBtn = document.getElementById("restart");

const size = 20;
let cells = [];
let snake = [];
let direction = 1;
let food = null;
let interval = 120;
let timer = null;
let score = 0;

function setupGrid() {
  game.innerHTML = "";
  cells = [];
  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    game.appendChild(cell);
    cells.push(cell);
  }
}

function draw() {
  cells.forEach(cell => cell.className = "cell");
  snake.forEach(i => cells[i].classList.add("snake"));
  if (food !== null) cells[food].classList.add("food");
}

function placeFood() {
  do {
    food = Math.floor(Math.random() * size * size);
  } while (snake.includes(food));
}

function move() {
  const head = snake[0];
  const newHead = head + direction;

  if (
    (direction === 1 && head % size === size - 1) || // вправо
    (direction === -1 && head % size === 0) || // влево
    (direction === size && head >= size * (size - 1)) || // вниз
    (direction === -size && head < size) || // вверх
    snake.includes(newHead)
  ) {
    clearInterval(timer);
    status.textContent = "💀 Игра окончена!";
    return;
  }

  snake.unshift(newHead);

  if (newHead === food) {
    score++;
    scoreDisplay.textContent = `Очки: ${score}`;
    placeFood();
  } else {
    snake.pop();
  }

  draw();
}

function changeDirection(e) {
  const key = e.key;
  if (key === "ArrowUp" && direction !== size) direction = -size;
  else if (key === "ArrowDown" && direction !== -size) direction = size;
  else if (key === "ArrowLeft" && direction !== 1) direction = -1;
  else if (key === "ArrowRight" && direction !== -1) direction = 1;
}

function startGame() {
  clearInterval(timer);
  setupGrid();
  score = 0;
  scoreDisplay.textContent = "Очки: 0";
  snake = [42, 41, 40];
  direction = 1;
  placeFood();
  draw();
  interval = parseInt(difficultySelect.value);
  timer = setInterval(move, interval);
  status.textContent = "";
}

document.addEventListener("keydown", changeDirection);
restartBtn.addEventListener("click", startGame);
difficultySelect.addEventListener("change", () => {
  if (timer) {
    clearInterval(timer);
    timer = setInterval(move, parseInt(difficultySelect.value));
  }
});

startGame(); // запуск при загрузке
// Установка начального уровня сложности
difficultySelect.value = "120"; // 120 мс
// Установка начального значения сложности
difficultySelect.dispatchEvent(new Event("change")); // обновление интервала
// Установка начального значения сложности
difficultySelect.value = "120"; // 120 мс