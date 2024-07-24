// Task list array to store tasks
let tasks = [];

// Get references to HTML elements
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false,
            priority: "low" // Default priority
        };

        tasks.push(task);
        renderTasks();
        taskInput.value = "";
    } else {
        alert("Please enter a task!");
    }
}

// Function to render tasks in the task list
function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach(task => {
        const taskItem = document.createElement("li");
        taskItem.id = task.id;
        taskItem.classList.add("priority-" + task.priority);
        if (task.completed) {
            taskItem.classList.add("completed");
        }
        taskItem.innerHTML = `
            <span>${task.text}</span>
            <div class="actions">
                <button onclick="toggleTaskCompletion(${task.id})">${task.completed ? "Undo" : "Done"}</button>
                <button class="edit" onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
}

// Function to toggle task completion
function toggleTaskCompletion(id) {
    const selectedTask = tasks.find(task => task.id === id);
    if (selectedTask) {
        selectedTask.completed = !selectedTask.completed;
        renderTasks();
    }
}

// Function to edit task
function editTask(id) {
    const selectedTask = tasks.find(task => task.id === id);
    if (selectedTask) {
        const newText = prompt("Edit task:", selectedTask.text);
        if (newText !== null) {
            selectedTask.text = newText.trim();
            renderTasks();
        }
    }
}

// Function to delete task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

// Initial rendering of tasks
renderTasks();
