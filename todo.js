let tasks = [
    { text: "Go to gym", completed: false, date: "2025-04-08", category: "Personal" },
    { text: "Send project files", completed: true, date: "2025-04-07", category: "Work" },
  ];
  
  const today = new Date().toISOString().split("T")[0];
  
  function addTask() {
    const text = document.getElementById("taskInput").value.trim();
    const date = document.getElementById("taskDate").value;
    const category = document.getElementById("taskCategory").value;
  
    if (text && date) {
      tasks.push({ text, completed: false, date, category });
      document.getElementById("taskInput").value = "";
      document.getElementById("taskDate").value = "";
      renderTasks();
    }
  }
  
  function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
  }
  
  function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
  }
  
  function renderTasks() {
    const filterCat = document.getElementById("categoryFilter").value;
    const filterStatus = document.getElementById("statusFilter").value;
  
    const filtered = tasks.filter(task => {
      const matchCat = filterCat === "All" || task.category === filterCat;
      const matchStatus =
        filterStatus === "All" ||
        (filterStatus === "Completed" && task.completed) ||
        (filterStatus === "Pending" && !task.completed);
      return matchCat && matchStatus;
    });
  
    const todayList = document.getElementById("todayTasks");
    const allList = document.getElementById("allTasks");
    todayList.innerHTML = "";
    allList.innerHTML = "";
  
    filtered.forEach((task, i) => {
      const item = document.createElement("li");
      item.innerHTML = `
        <div>
          <p class="${task.completed ? "completed" : ""}">${task.text}</p>
          <small>${task.date} - ${task.category}</small>
        </div>
        <div>
          <button onclick="toggleComplete(${i})">✔️</button>
          <button onclick="deleteTask(${i})">🗑️</button>
        </div>
      `;
      if (task.date === today) {
        todayList.appendChild(item.cloneNode(true));
      }
      allList.appendChild(item);
    });
  }
  
  renderTasks();
  