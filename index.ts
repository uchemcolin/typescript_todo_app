interface Task {
    id: number;
    title: string;
    completed: boolean;
}

let tasks: Task[] = [];
let nextId: number = 1;

const addButton = document.getElementById("add-button") as HTMLButtonElement;
const taskList = document.getElementById("task-list") as HTMLUListElement;
const newTaskInput = document.getElementById("new-task") as HTMLInputElement;
const emptyListMessage = document.getElementById("empty-list-message") as HTMLDivElement;

// Function to render the task list
function renderTasks() {
    taskList.innerHTML = ''; // Clear the current list

    if (tasks.length === 0) {
        emptyListMessage.style.display = 'block';
    } else {
        emptyListMessage.style.display = 'none';
        tasks.forEach(task => {
            const listItem = document.createElement('li');
            listItem.classList.add('task-item');
            if (task.completed) {
                listItem.classList.add('completed');
            }

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('task-checkbox');
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', () => toggleComplete(task.id));

            const taskTextSpan = document.createElement('span');
            taskTextSpan.classList.add('task-text');
            taskTextSpan.textContent = task.title;

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteTask(task.id));

            listItem.appendChild(checkbox);
            listItem.appendChild(taskTextSpan);
            listItem.appendChild(deleteButton);
            taskList.appendChild(listItem);
        });
    }
}

// Function to toggle the completion status of a task
function toggleComplete(taskId: number) {
    tasks = tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    renderTasks(); // Re-render the list after toggling
    console.log(tasks); // For debugging
}

// Function to delete a task
function deleteTask(taskId: number) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks(); // Re-render the list after deleting
    console.log(tasks); // For debugging
}

// Event listener for adding a new task
addButton.addEventListener("click", function() {
    const newTaskTitle = newTaskInput.value.trim();

    if (newTaskTitle) {
        const newTaskToAdd: Task = {
            id: nextId++,
            title: newTaskTitle,
            completed: false
        };

        tasks.push(newTaskToAdd);
        newTaskInput.value = "";
        renderTasks(); // Re-render the list after adding
        console.log(tasks);
    } else {
        alert("Please enter something");
    }
});

// Initial rendering of tasks (in case there are any initially)
renderTasks();