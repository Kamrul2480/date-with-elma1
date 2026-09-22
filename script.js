const pages = [
  {
    emoji: "💌",
    question: "Hi Elma, can I tell you something?",
    subtext: "Just one little question... 😊",
    no: "Aww, please say yes! 🥺"
  },
  {
    emoji: "😁",
    question: "Do you like your senior KAMRUL?",
    subtext: "Be honest... 👀",
    no: "Hmm... think again 😄"
  },
  {
    emoji: "🍛",
    question: "Do you like kacchi?",
    subtext: "Important question! 😋",
    no: "Kacchi still deserves a chance! 😂"
  },
  {
    emoji: "👀",
    question: "Are you single?",
    subtext: "Okay... this one is important. 😳",
    no: "Ohh... plot twist! 😅"
  },
  {
    emoji: "💕",
    question: "Would you like to go on a date with me?",
    subtext: "Maybe we could have kacchi together? 🍛❤️",
    no: "No pressure. Your answer is respected. ❤️"
  }
];

let current = 0;

const emoji = document.getElementById("emoji");
const pageCount = document.getElementById("pageCount");
const question = document.getElementById("question");
const subtext = document.getElementById("subtext");
const buttons = document.getElementById("buttons");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");
const card = document.querySelector(".card");

const datePickerContainer = document.getElementById("datePickerContainer");
const dateInput = document.getElementById("dateInput");
const timeSelect = document.getElementById("timeSelect");
const confirmDateBtn = document.getElementById("confirmDateBtn");

const today = new Date().toISOString().split("T")[0];
dateInput.min = today;

function renderPage() {
  const page = pages[current];

  card.classList.remove("final");
  void card.offsetWidth;
  card.classList.add("final");

  noBtn.style.position = "static";
  noBtn.style.left = "auto";
  noBtn.style.top = "auto";
  noBtn.style.transform = "none";
  noBtn.style.zIndex = "10";

  emoji.textContent = page.emoji;
  pageCount.textContent = `${current + 1} / ${pages.length}`;
  question.textContent = page.question;
  subtext.textContent = page.subtext;
  message.textContent = "";

  if (current === pages.length - 1) {
    yesBtn.textContent = "Yes ❤️";
    noBtn.textContent = "No 😅";
  } else {
    yesBtn.textContent = "Yes ❤️";
    noBtn.textContent = "No 🙈";
  }
}

function nextPage() {
  if (current < pages.length - 1) {
    current++;
    renderPage();
    burstHearts(5);
  } else {
    showFinal();
  }
}

function showFinal() {
  emoji.textContent = "🥰";
  pageCount.textContent = "❤️";
  question.textContent = "Yay! It's a Date! ❤️";
  subtext.textContent = "Pick a date & time for our kacchi date! 🍛☕✨";
  buttons.classList.add("hidden");
  datePickerContainer.classList.remove("hidden");
  burstHearts(22);
}

confirmDateBtn.addEventListener("click", () => {
  const selectedDate = dateInput.value;
  const selectedTime = timeSelect.value;

  if (!selectedDate || !selectedTime) {
    message.textContent = "Please select both date and time! 🗓️⏰";
    return;
  }

  const dt = new Date(selectedDate);
  const formattedDate = dt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  datePickerContainer.classList.add("hidden");
  message.textContent = `See you on ${formattedDate} at ${selectedTime}! 💕✨`;
  burstHearts(25);
});

function dodgeNoButton(e) {
  if (current === pages.length - 1) return;

  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }

  message.textContent = pages[current].no;

  const btnWidth = noBtn.offsetWidth || 110;
  const btnHeight = noBtn.offsetHeight || 45;

  const padding = 25;
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  const minX = padding;
  const maxX = viewportWidth - btnWidth - padding;
  const minY = padding;
  const maxY = viewportHeight - btnHeight - padding;

  const safeMaxX = Math.max(minX, maxX);
  const safeMaxY = Math.max(minY, maxY);

  const randomX = Math.floor(Math.random() * (safeMaxX - minX + 1)) + minX;
  const randomY = Math.floor(Math.random() * (safeMaxY - minY + 1)) + minY;

  noBtn.style.position = "fixed";
  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
  noBtn.style.transition = "left 0.22s ease-out, top 0.22s ease-out, transform 0.15s ease";
  noBtn.style.transform = "scale(1.05)";

  setTimeout(() => {
    noBtn.style.transform = "scale(1)";
  }, 150);
}

yesBtn.addEventListener("click", nextPage);

noBtn.addEventListener("mouseover", dodgeNoButton);
noBtn.addEventListener("mouseenter", dodgeNoButton);
noBtn.addEventListener("mousedown", dodgeNoButton);
noBtn.addEventListener("pointerdown", dodgeNoButton);
noBtn.addEventListener("touchstart", dodgeNoButton, { passive: false });

noBtn.addEventListener("click", (e) => {
  if (current === pages.length - 1) {
    message.textContent = "That's totally okay. ❤️";
  } else {
    e.preventDefault();
    dodgeNoButton(e);
  }
});

function burstHearts(count) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.textContent = Math.random() > .35 ? "❤️" : "💕";
      heart.style.left = `${Math.random() * 100}vw`;
      heart.style.fontSize = `${14 + Math.random() * 18}px`;
      heart.style.animationDuration = `${3 + Math.random() * 3}s`;
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 6500);
    }, i * 80);
  }
}

setInterval(() => {
  if (Math.random() > .45) burstHearts(1);
}, 1200);

renderPage();