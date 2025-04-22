var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var tasks = [];
var nextId = 1;
var addButton = document.getElementById("add-button");
var taskList = document.getElementById("task-list");
var newTaskInput = document.getElementById("new-task");
var emptyListMessage = document.getElementById("empty-list-message");
// Function to render the task list
function renderTasks() {
    taskList.innerHTML = ''; // Clear the current list
    if (tasks.length === 0) {
        emptyListMessage.style.display = 'block';
    }
    else {
        emptyListMessage.style.display = 'none';
        tasks.forEach(function (task) {
            var listItem = document.createElement('li');
            listItem.classList.add('task-item');
            if (task.completed) {
                listItem.classList.add('completed');
            }
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('task-checkbox');
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', function () { return toggleComplete(task.id); });
            var taskTextSpan = document.createElement('span');
            taskTextSpan.classList.add('task-text');
            taskTextSpan.textContent = task.title;
            var deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function () { return deleteTask(task.id); });
            listItem.appendChild(checkbox);
            listItem.appendChild(taskTextSpan);
            listItem.appendChild(deleteButton);
            taskList.appendChild(listItem);
        });
    }
}
// Function to toggle the completion status of a task
function toggleComplete(taskId) {
    tasks = tasks.map(function (task) {
        return task.id === taskId ? __assign(__assign({}, task), { completed: !task.completed }) : task;
    });
    renderTasks(); // Re-render the list after toggling
    console.log(tasks); // For debugging
}
// Function to delete a task
function deleteTask(taskId) {
    tasks = tasks.filter(function (task) { return task.id !== taskId; });
    renderTasks(); // Re-render the list after deleting
    console.log(tasks); // For debugging
}
// Event listener for adding a new task
addButton.addEventListener("click", function () {
    var newTaskTitle = newTaskInput.value.trim();
    if (newTaskTitle) {
        var newTaskToAdd = {
            id: nextId++,
            title: newTaskTitle,
            completed: false
        };
        tasks.push(newTaskToAdd);
        newTaskInput.value = "";
        renderTasks(); // Re-render the list after adding
        console.log(tasks);
    }
    else {
        alert("Please enter something");
    }
});
// Initial rendering of tasks (in case there are any initially)
renderTasks();
