function handleGoogleLogin(response) {
  const data = jwt_decode(response.credential);
  const email = data.email;

  const users = JSON.parse(localStorage.getItem("users") || "{}");

  if (!users[email]) {
    users[email] = {
      password: null, 
      completed: 0,
      completedChallenges: [] 
    };
  }

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", email);
  localStorage.setItem("user", JSON.stringify(data)); 
  window.location.href = "index1.html";
}

let isSignup = false;

function toggleMode() {
  isSignup = !isSignup;
  document.getElementById("submitBtn").innerText = isSignup ? "Sign Up" : "Login";
  document.getElementById("toggleText").innerHTML = isSignup
    ? `Already have an account? <span class="toggle-link" onclick="toggleMode()">Login</span>`
    : `Don’t have an account? <span class="toggle-link" onclick="toggleMode()">Sign up</span>`;
  document.getElementById("statusMsg").textContent = "";
}

document.getElementById("authForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const users = JSON.parse(localStorage.getItem("users") || "{}");

  if (isSignup) {
    if (users[email]) {
      document.getElementById("statusMsg").textContent = "Email already exists!";
    } else {
      users[email] = {
        password,
        completed: 0,
        completedChallenges: [] 
      };
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", email);
      window.location.href = "index1.html";
    }
  } else {
    if (users[email] && users[email].password === password) {
      localStorage.setItem("currentUser", email);
      window.location.href = "index1.html";
    } else {
      document.getElementById("statusMsg").textContent = "Invalid credentials!";
    }
  }
});
