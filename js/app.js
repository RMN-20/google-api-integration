const challenges = [
  "Create a button that changes color on click",
  "Build a dark mode toggle",
  "Make a calculator using JS",
  "Create a live countdown timer",
  "Build a responsive navbar",
  "Make a todo list with localStorage",
  "Fetch and show data from an API",
  "Design a form with validation"
];

const cards = document.querySelectorAll(".card");
const reshuffleBtn = document.getElementById("reshuffleBtn");

let flipped = false;
let usedChallenges = [];

cards.forEach((card) => {
  card.addEventListener("click", () => {
    if (flipped || card.classList.contains("flipped")) return;

    
    let challenge;
    do {
      challenge = challenges[Math.floor(Math.random() * challenges.length)];
    } while (usedChallenges.includes(challenge) && usedChallenges.length < challenges.length);

    usedChallenges.push(challenge);

    const back = card.querySelector(".back");
    back.textContent = challenge;

    card.classList.add("flipped");
    flipped = true;

    
    localStorage.setItem("completedChallenge", challenge);

    
    const currentUser = localStorage.getItem("currentUser");
    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (currentUser && users[currentUser]) {
      const completed = users[currentUser].completedChallenges || [];
      if (!completed.includes(challenge)) {
        completed.push(challenge);
        users[currentUser].completedChallenges = completed;
        users[currentUser].completed = completed.length;
        localStorage.setItem("users", JSON.stringify(users));
      }
    }

    
    cards.forEach(c => {
      if (c !== card) c.classList.add("disabled");
    });
  });
});

reshuffleBtn.addEventListener("click", () => {
  flipped = false;
  usedChallenges = [];
  localStorage.removeItem("completedChallenge");

  cards.forEach(card => {
    card.classList.remove("flipped", "disabled");
    card.querySelector(".back").textContent = "";
  });

  
  showCompletedChallenges();
});


function showCompletedChallenges() {
  const currentUser = localStorage.getItem("currentUser");
  const users = JSON.parse(localStorage.getItem("users") || "{}");
  const list = document.getElementById("completedList");

  if (currentUser && users[currentUser]) {
    const challenges = users[currentUser].completedChallenges || [];
    if (challenges.length === 0) {
      list.innerHTML = "<li>No challenges completed yet.</li>";
    } else {
      list.innerHTML = challenges.map(c => `<li>${c}</li>`).join('');
    }
  } else {
    list.innerHTML = "<li>Please log in to track your challenges.</li>";
  }
}


showCompletedChallenges();
