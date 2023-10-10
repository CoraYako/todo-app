const addTaskForm = document.querySelector(".add"); // form that contains input box to add new tasks
const tasks = document.querySelector(".tasks"); // tasks from the task list section
const clearButton = document.querySelector(".clear"); // Clear All button
const message = document.querySelector(".message span"); // remaining tasks message
const searchBox = document.querySelector(".search"); // task search box

/**
 * Updates the message from the remaining tasks depending on the
 * number of <li> html elements 
 */
function updateRemainingTasksMessage() {
    message.textContent = `You have ${tasks.childElementCount} pending tasks.`;
}

/**
 * Generate a <li> HTML element with an icon and a value that
 * can be passed as argument
 */
function generateHTML(value) {
    return `<li>
                <span>${value}</span>
                <i class="bi bi-trash delete"></i>
            </li>`;
}
/**
 * Fillter all tasks that matchs with the value argument hiding the not
 * matching ones by adding the .hide CSS class.
 */
function filterTask(value) {
    Array.from(tasks.children)
        .filter(task => !task.textContent.toLowerCase().includes(value))
        .forEach(task => task.classList.add("hide"));

    Array.from(tasks.children)
        .filter(task => task.textContent.toLowerCase().includes(value))
        .forEach(task => task.classList.remove("hide"));
}

/**
 * When a key is pressed, the filterTask() method is called
 * to filter the tasks that match the current value
 */
searchBox.addEventListener("keyup", event => {
    event.preventDefault();
    const textValue = searchBox.task.value.trim().toLowerCase();
    filterTask(textValue);
});

/**
 * Grabs the icon at the right of the search task box
 * and if is clicked, will delete the text inside the
 * search box and showing back all the tasks
 */
searchBox.addEventListener("click", event => {
    if (event.target.classList.contains("reset")) {
        searchBox.reset();
        const textValue = searchBox.task.value.trim().toLowerCase();
        filterTask(textValue);
    }
});

/**
 * Create a new task with the value that is passed
 * in the input box.
 */
addTaskForm.addEventListener("submit", event => {
    event.preventDefault();
    const value = addTaskForm.task.value.trim();
    if (value.length > 0) {
        addTaskForm.reset();
        tasks.innerHTML += generateHTML(value);
        updateRemainingTasksMessage();
    }
});

/**
 * It takes the element that contains the .delete class
 * which in this case is the trash icon in the html document.
 * When this icon is clicked, will remove the parent element completly,
 * in this case will be the <li> element.
 */
tasks.addEventListener("click", event => {
    if (event.target.classList.contains("delete")) {
        event.target.parentElement.remove();
        updateRemainingTasksMessage();
    }
});

/**
 * Clear all the tasks in the task list, updating the
 * remaining tasks counter.
 */
clearButton.addEventListener("click", event => {
    const tasksItems = tasks.querySelectorAll("li");
    tasksItems.forEach(taskItem => taskItem.remove());
    updateRemainingTasksMessage();
});

