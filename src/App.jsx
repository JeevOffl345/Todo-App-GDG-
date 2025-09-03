import React, { useState, useEffect } from "react";
import "./styles.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([
      ...tasks,
      {
        text: input,
        completed: false,
        createdAt: new Date().toLocaleDateString("en-GB"),
      },
    ]);
    setInput("");
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const date = new Date();

  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className={darkMode ? "Application dark" : "Application light"}>
      <header>
        <p>To-Do App✅</p>
        <p>
          {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
        </p>
        <button className="theme" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      <h1 className="greeting">Welcome Back!👋</h1>

      <div className="container">
        <div className="app">
          <div className="input-container">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add a new task..."
            />
            <button onClick={addTask}>Add</button>
          </div>

          <div className="filter-container">
            <button
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={filter === "pending" ? "active" : ""}
              onClick={() => setFilter("pending")}
            >
              Pending
            </button>
            <button
              className={filter === "completed" ? "active" : ""}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
          </div>

          <ul>
            {filteredTasks.map((task, index) => (
              <li key={index} className={task.completed ? "completed" : ""}>
                {task.text}
                <div>
                  <button className="Done" onClick={() => toggleTask(index)}>
                    {task.completed ? "↩ Undo" : "✔ Done"}
                  </button>
                  <button className="Delete" onClick={() => deleteTask(index)}>
                    ❌ Delete
                  </button>
                </div>
                <p>
                  Created on: {new Date(task.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
