 function addtask() {
    const inputBox = document.getElementById("input-box");
    const listcontainer = document.getElementById("list-container");

    if (inputBox.value.trim() === "") {
        alert("You must write something");
        return;
    }

    const li = createTaskElement(inputBox.value);
    listcontainer.appendChild(li);

    inputBox.value = ""; // Clear input
    savedata(); // Save tasks
}

function createTaskElement(taskText, isChecked = false) {
    const li = document.createElement("li");
    li.textContent = taskText;

    if (isChecked) {
        li.classList.add("checked"); // Restore checked state if applicable
    }

    const buttoncontainer = document.createElement("div");
    buttoncontainer.className = "task-button";

    const completebutton = document.createElement("button");
    completebutton.innerText = "Complete";
    completebutton.onclick = function () {
        li.classList.toggle("checked");
        savedata();
    };

    const deletebutton = document.createElement("button");
    deletebutton.innerText = "Delete";
    deletebutton.onclick = function () {
        li.remove();
        savedata();
    };

    buttoncontainer.appendChild(completebutton);
    buttoncontainer.appendChild(deletebutton);
    li.appendChild(buttoncontainer);

    return li;
}

function savedata() {
    const listcontainer = document.getElementById("list-container");
    const tasks = Array.from(listcontainer.querySelectorAll("li")).map((li) => ({
        text: li.firstChild.textContent.trim(),
        checked: li.classList.contains("checked"),
    }));

    localStorage.setItem("tasks", JSON.stringify(tasks)); // Save tasks as JSON
}

function showdata() {
    const listcontainer = document.getElementById("list-container");
    const tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Load tasks from localStorage

    tasks.forEach((task) => {
        const li = createTaskElement(task.text, task.checked);
        listcontainer.appendChild(li);
    });
}

// Load saved tasks on page load
showdata();