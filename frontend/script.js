const API = "https://daily-goals-covn.onrender.com";

// Redirect if no token
if (location.pathname === "/index.html" && !localStorage.getItem("token")) {
  location.href = "login.html";
}

// LOGIN
async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  if (data.token) {
    localStorage.setItem("token", data.token);
    location.href = "index.html";
  } else {
    alert(data.message);
  }
}

// SIGNUP
async function signup() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  alert(data.message);

  if (data.message === "Signup Success") {
    location.href = "login.html";
  }
}

// Fetch Goals
async function loadGoals() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/api/goals`, {
    headers: { Authorization: "Bearer " + token }
  });

  const goals = await res.json();
  const list = document.getElementById("goalList");
  list.innerHTML = "";

  goals.forEach((g) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${g.text}
      <button onclick="deleteGoal('${g._id}')">X</button>
    `;
    list.appendChild(li);
  });
}

// Add Goal
async function addGoal() {
  const token = localStorage.getItem("token");
  const text = document.getElementById("goalInput").value;

  await fetch(`${API}/api/goals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({ text })
  });

  document.getElementById("goalInput").value = "";
  loadGoals();
}

// Delete Goal
async function deleteGoal(id) {
  const token = localStorage.getItem("token");

  await fetch(`${API}/api/goals/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token
    }
  });

  loadGoals();
}

// Logout
function logout() {
  localStorage.removeItem("token");
  location.href = "login.html";
}

if (location.pathname.includes("index")) loadGoals();
