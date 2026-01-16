let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let timerInterval;
let seconds = 0;

function addTask() {
    let subject = document.getElementById("subject").value;
    let topic = document.getElementById("topic").value;

    if (subject === "" || topic === "") {
        alert("Please fill both fields!");
        return;
    }

    let task = {
        text: subject + " - " + topic,
        done: false
    };

    tasks.push(task);
    saveTasks();
    displayTasks();

    document.getElementById("subject").value = "";
    document.getElementById("topic").value = "";
}

function displayTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        let text = document.createElement("span");
        text.innerText = task.text;

        let btn = document.createElement("button");
        btn.innerText = task.done ? "✔ Done" : "Mark Done";
        btn.onclick = function () {
            tasks[index].done = !tasks[index].done;
            saveTasks();
            updateProgress();
            displayTasks();
        };

        li.appendChild(text);
        li.appendChild(btn);
        list.appendChild(li);
    });

    updateProgress();
}

function updateProgress() {
    let completed = tasks.filter(t => t.done).length;
    let total = tasks.length;

    let percent = total === 0 ? 0 : (completed / total) * 100;

    document.getElementById("progress").style.width = percent + "%";
    document.getElementById("progressText").innerText = Math.round(percent) + "% Completed";
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ---- TIMER FUNCTIONS ----

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        seconds++;
        let min = Math.floor(seconds / 60);
        let sec = seconds % 60;
        document.getElementById("timer").innerText =
            (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    clearInterval(timerInterval);
    seconds = 0;
    document.getElementById("timer").innerText = "00:00";
}

// Load tasks on page refresh
displayTasks();
