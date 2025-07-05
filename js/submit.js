const challenge = localStorage.getItem("completedChallenge");
const challengeText = document.getElementById("challengeText");
const form = document.getElementById("uploadForm");
const statusMessage = document.getElementById("statusMessage");
const afterActions = document.getElementById("afterActions");

if (challenge) {
  challengeText.innerHTML = `<strong>Challenge:</strong> ${challenge}`;
} else {
  challengeText.textContent = "No challenge selected!";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const file = document.getElementById("fileInput").files[0];
  const captcha = grecaptcha.getResponse();

  if (!file) {
    statusMessage.textContent = "Please select a file.";
    return;
  }

  if (!captcha) {
    statusMessage.textContent = "Please complete the reCAPTCHA.";
    return;
  }

  statusMessage.innerHTML = `File "${file.name}" submitted successfully!<br><strong>Challenge:</strong> ${challenge}`;
  form.reset();
  grecaptcha.reset();
  afterActions.style.display = "flex";
});

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}
