
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const errorMessage = document.getElementById("errorMessage");


// Store all tasks in an array
let tasks = [];

// Track the selected filter
let currentFilter = "all";
// Get all filter buttons
const filterButtons = document.querySelectorAll("[data-filter]");

// Change the displayed tasks when a filter is clicked
filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        currentFilter = button.dataset.filter;

        // Highlight the selected filter
        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        renderTasks();
    });
});


// Add a new task
taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const text = taskInput.value.trim();

    // Validate the input
    if (text === "") {
        errorMessage.textContent = "Please enter a task.";
        return;
    }

    // Create the task object
    const task = {
        id: Date.now(),
        text: text,
        completed: false
    };

    // Store the task
    tasks.push(task);

    // Clear the input and error message
    taskInput.value = "";
    errorMessage.textContent = "";

    // Update the displayed tasks
    renderTasks();
});



function renderTasks() {
    // Clear the current list
    taskList.innerHTML = "";

    // Choose which tasks should be displayed
let filteredTasks = tasks;

if (currentFilter === "active") {
    filteredTasks = tasks.filter(function (task) {
        return !task.completed;
    });
} else if (currentFilter === "completed") {
    filteredTasks = tasks.filter(function (task) {
        return task.completed;
    });
}

// Show a message if the selected filter has no matching tasks
if (filteredTasks.length === 0) {
    let message = "No tasks yet. Add your first task!";

    if (currentFilter === "active" && tasks.length > 0) {
        message = "No active tasks.";
    } else if (currentFilter === "completed" && tasks.length > 0) {
        message = "No completed tasks.";
    }

    taskList.innerHTML = `
        <li class="list-group-item text-center">${message}</li>
    `;
}

    // Display each task
    filteredTasks.forEach(function (task) {
        const li = document.createElement("li");

        li.className =
            "list-group-item d-flex justify-content-between align-items-center gap-3";

        // Create a section for the checkbox and task text
        const taskInfo = document.createElement("div");
        taskInfo.className = "d-flex align-items-center gap-2";

        // Create the checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.className = "form-check-input";

        // Create the task text
        const taskText = document.createElement("span");
        taskText.textContent = task.text;

        if (task.completed) {
            taskText.classList.add("completed");
        }

        // Mark task completed or active
        checkbox.addEventListener("change", function () {
            task.completed = checkbox.checked;
            renderTasks();
        });

        // Create the Delete button
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.className = "btn btn-outline-danger btn-sm";

        // Delete only this task
        deleteButton.addEventListener("click", function () {
            tasks = tasks.filter(function (item) {
                return item.id !== task.id;
            });

            renderTasks();
        });

        // Assemble the task
        taskInfo.appendChild(checkbox);
        taskInfo.appendChild(taskText);

        li.appendChild(taskInfo);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });

    // Update the counter
    const remaining = tasks.filter(function (task) {
        return !task.completed;
    }).length;

    taskCount.textContent = remaining + " tasks remaining";
}



