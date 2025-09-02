import React, { useState, useEffect } from "react";
import "./styles.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { text: input, completed: false }]);
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

  const [darkMode, setDarkMode] = useState("true");
  return (
    <div className={darkMode ? "Application dark" : "Application light"}>
      <header>
        <p>To-Do App✅</p>
        <p>
          {3}/{date.getMonth()}/{date.getFullYear()}
        </p>
        <button className="theme" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light" : "🌙 Dark"}
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

          <h2>📌 Pending Tasks</h2>
          <ul>
            {tasks.map(
              (task, index) =>
                !task.completed && (
                  <li key={index}>
                    {task.text}
                    <div>
                      <button onClick={() => toggleTask(index)}>✔ Done</button>
                      <button onClick={() => deleteTask(index)}>
                        ❌ Delete
                      </button>
                      <p>
                        Created on: {date.getDate()}/{date.getMonth()}/
                        {date.getFullYear()}
                      </p>
                    </div>
                  </li>
                )
            )}
          </ul>

          <h2>✅ Completed Tasks</h2>
          <ul>
            {tasks.map(
              (task, index) =>
                task.completed && (
                  <li key={index} className="completed">
                    {task.text}
                    <div>
                      <button onClick={() => toggleTask(index)}>↩ Undo</button>
                      <button onClick={() => deleteTask(index)}>
                        ❌ Delete
                      </button>
                    </div>
                  </li>
                )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
