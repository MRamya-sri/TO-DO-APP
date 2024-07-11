let tasks = [];

// Function to add a task
const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = "";
        updateTasksList();
    }
};

// Function to update the task list display
const updateTasksList = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? "completed" : ""}">
                    <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} onChange="toggleTaskComplete(${index})">
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="edit.png" onClick="editTask(${index})" />
                    <img src="delete.png" onClick="deleteTask(${index})" />
                </div>
            </div>
        `;

        taskList.append(listItem);
    });

    // Update stats after updating the task list
    updateStats();
};

// Function to toggle task completion status
const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
};

// Function to delete a task
const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
};

// Function to edit a task (to be implemented)
const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    taskInput.value = tasks[index].text;

    tasks.splice(index, 1);
    updateTasksList();
};

const updateStats = () => {
    const completedTasks = tasks.filter((task) => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    const progressBar = document.getElementById("progress");

    progressBar.style.width = `${progress}%`;

    document.getElementById("numbers").innerText = `${completedTasks} / ${totalTasks}`;

    if(tasks.length && completedTasks === totalTasks){
        blaskConfetti();
    }
};

// Event listener for the add task button
document.getElementById("newTask").addEventListener("click", function (e) {
    e.preventDefault();
    addTask();
});


const blaskConfetti = () => {
    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }
      
      confetti({
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        particleCount: randomInRange(50, 100),
        origin: { y: 0.6 },
      });

}
