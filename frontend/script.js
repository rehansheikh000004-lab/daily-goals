// Load goals from localStorage
let goals = JSON.parse(localStorage.getItem("goals")) || [];

function saveGoals() {
    localStorage.setItem("goals", JSON.stringify(goals));
}

function renderGoals() {
    const list = document.getElementById("goalList");
    list.innerHTML = "";

    goals.forEach((goal, index) => {
        const li = document.createElement("li");
        li.className = "goal-item";

        li.innerHTML = `
            <span>${goal}</span>
            <button class="delete-btn" onclick="deleteGoal(${index})">Delete</button>
        `;

        list.appendChild(li);
    });
}

function addGoal() {
    const input = document.getElementById("goalInput");
    const text = input.value.trim();

    if (text === "") return;

    goals.push(text);
    saveGoals();
    renderGoals();
    input.value = "";
}

function deleteGoal(i) {
    goals.splice(i, 1);
    saveGoals();
    renderGoals();
}

// Initial render
renderGoals();
