document.addEventListener("DOMContentLoaded", () => {
  createFallingHearts();
  setupOpenButton();
  setupCounter();
});

// ========== FALLING HEARTS ==========

function createFallingHearts() {
  const container = document.getElementById("hearts-container");
  const hearts = ["❤️", "💕", "💗", "💖", "🩷", "♥️"];
  const count = window.innerWidth < 480 ? 15 : 25;

  for (let i = 0; i < count; i++) {
    const heart = document.createElement("div");
    heart.classList.add("falling-heart");
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + "%";
    heart.style.fontSize = 14 + Math.random() * 20 + "px";
    heart.style.animationDuration = 6 + Math.random() * 8 + "s";
    heart.style.animationDelay = Math.random() * 10 + "s";
    container.appendChild(heart);
  }
}

// ========== OPEN CARD ==========

function setupOpenButton() {
  const btn = document.getElementById("open-btn");
  const envelope = document.getElementById("envelope");
  const card = document.getElementById("card");
  let opened = false;

  btn.addEventListener("click", () => {
    if (opened) return;
    opened = true;

    // 1. Открываем конверт
    envelope.classList.add("opened");

    // 2. Прячем кнопку
    btn.classList.add("hidden");

    // 3. Показываем открытку
    setTimeout(() => {
      card.classList.add("visible");
      startTypewriter();
      launchConfetti();

      // Плавно прокручиваем к открытке
      setTimeout(() => {
        card.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    }, 700);
  });
}

// ========== TYPEWRITER ==========

function startTypewriter() {
  const textEl = document.getElementById("card-text");

  // ======================================
  // ✏️ НАПИШИ СВОЙ ТЕКСТ ЗДЕСЬ:
  // ======================================
  const message = `Моя дорогая жена, я очень тебя люблю и очень рад, что мы вместе!

Хочу прожить с тобой всю жизнь ❤️`;
  // ======================================

  let index = 0;
  textEl.innerHTML = '<span class="cursor"></span>';

  const interval = setInterval(() => {
    if (index < message.length) {
      const cursor = textEl.querySelector(".cursor");
      const char = message[index] === "\n" ? "<br>" : message[index];

      if (message[index] === "\n") {
        cursor.insertAdjacentHTML("beforebegin", "<br>");
      } else {
        cursor.insertAdjacentText("beforebegin", message[index]);
      }

      index++;
    } else {
      clearInterval(interval);
      // Убираем курсор через 2 секунды после окончания
      setTimeout(() => {
        const cursor = textEl.querySelector(".cursor");
        if (cursor) cursor.remove();
      }, 2000);

      // Показываем счётчик
      const counter = document.getElementById("counter");
      if (counter.textContent) {
        counter.classList.add("visible");
      }
    }
  }, 50);
}

// ========== CONFETTI ==========

function launchConfetti() {
  if (typeof confetti !== "function") return;

  // Первый залп
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.7 },
    colors: ["#ff4d6d", "#ffb3c1", "#ff758f", "#c9184a", "#fff0f3"],
  });

  // Второй залп с задержкой
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ["#ff4d6d", "#ffb3c1", "#ff758f"],
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ["#ff4d6d", "#ffb3c1", "#ff758f"],
    });
  }, 600);
}

// ========== COUNTER ==========

function setupCounter() {
  const counter = document.getElementById("counter");

  // ======================================
  // 📅 УКАЖИ ДАТУ НАЧАЛА ВАШИХ ОТНОШЕНИЙ:
  //    (формат: год, месяц-1, день)
  //    Например: new Date(2020, 0, 15) = 15 января 2020
  //    Оставь null, если не хочешь показывать
  // ======================================
  const startDate = new Date(2020, 8, 22); // 22 сентября 2020
  // ======================================

  if (!startDate) {
    counter.style.display = "none";
    return;
  }

  const now = new Date();
  const diff = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));

  const years = Math.floor(diff / 365);
  const days = diff % 365;

  let text = "💕 Мы вместе уже ";
  if (years > 0) {
    text += `${years} ${pluralize(years, "год", "года", "лет")} и `;
  }
  text += `${days} ${pluralize(days, "день", "дня", "дней")}`;
  text += " 💕";

  counter.textContent = text;
}

function pluralize(n, one, few, many) {
  const mod10 = n % 10;
  const mod100 = n % 100;

  if (mod100 >= 11 && mod100 <= 19) return many;
  if (mod10 === 1) return one;
  if (mod10 >= 2 && mod10 <= 4) return few;
  return many;
}
