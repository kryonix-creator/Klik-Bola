const startBtn = document.getElementById("start");
const gameArea = document.getElementById("game-area");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");

let score = 0;
let time = 15;
let timer;
let gameRunning = false;

// Fungsi buat bola baru di posisi acak
function createBall() {
  if (!gameRunning) return;

  const ball = document.createElement("div");
  ball.classList.add("ball");

  const x = Math.random() * (gameArea.clientWidth - 40);
  const y = Math.random() * (gameArea.clientHeight - 40);
  ball.style.left = `${x}px`;
  ball.style.top = `${y}px`;

  gameArea.appendChild(ball);

  ball.addEventListener("click", () => {
    score++;
    scoreEl.textContent = score;
    ball.remove();
    createBall(); // buat bola baru setelah diklik
  });

  // Hapus bola setelah 1.5 detik agar tidak menumpuk
  setTimeout(() => {
    if (ball.parentNode) {
      ball.remove();
      createBall();
    }
  }, 1500);
}

// Fungsi mulai game
startBtn.addEventListener("click", () => {
  score = 0;
  time = 15;
  gameRunning = true;
  scoreEl.textContent = "0";
  timeEl.textContent = time;
  gameArea.innerHTML = "";
  startBtn.disabled = true;

  createBall();

  timer = setInterval(() => {
    time--;
    timeEl.textContent = time;

    if (time <= 0) {
      clearInterval(timer);
      gameRunning = false;
      gameArea.innerHTML = "";
      startBtn.disabled = false;
      alert(`⏰ Waktu habis! Skormu: ${score}`);
    }
  }, 1000);
});
