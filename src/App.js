import { useEffect, useState } from "react";
import "./App.css";

// const tasksList = ;

function App() {
  const [isAllSelected, setIsAllSelected] = useState(true);
  const [isActiveSelected, setIsActiveSelected] = useState(false);
  const [isCompletedSelected, setIsCompletedSelected] = useState(false);
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("toDoTasks") || "[]")
  );

  console.log(tasks);

  const toggleTaskStatus = function (current_task) {
    const _tasks = tasks.slice();
    _tasks.map((task) =>
      current_task.id === task.id ? (task.completed = !task.completed) : null
    );
    setTasks(_tasks);
    localStorage.setItem("toDoTasks", JSON.stringify(_tasks));
    // console.log(current_task, tasks);
  };

  const addTasks = function () {
    const name = document.getElementById("add-details").value;
    const _tasks = tasks.slice();
    name &&
      _tasks.push({ name, completed: false, id: new Date().getTime() }) &&
      localStorage.setItem("toDoTasks", JSON.stringify(_tasks));
    setTasks(_tasks);
    // console.log(tasks);
  };

  return (
    <div className="App">
      <header className="App-header">#todo</header>
      <div className="status-buttons-container">
        <button
          id="all"
          className={`status-buttons ${isAllSelected ? "selected" : ""}`}
          onClick={() => {
            setIsAllSelected(true);
            setIsActiveSelected(false);
            setIsCompletedSelected(false);
          }}
        >
          All
        </button>
        <button
          id="active"
          className={`status-buttons ${isActiveSelected ? "selected" : ""}`}
          onClick={() => {
            setIsActiveSelected(true);
            setIsAllSelected(false);
            setIsCompletedSelected(false);
          }}
        >
          Active
        </button>
        <button
          id="completed"
          className={`status-buttons ${isCompletedSelected ? "selected" : ""}`}
          onClick={() => {
            setIsCompletedSelected(true);
            setIsAllSelected(false);
            setIsActiveSelected(false);
          }}
        >
          Completed
        </button>
      </div>
      <div className="add-task-container">
        <input
          id="add-details"
          placeholder="add details"
          className="input-details"
        ></input>
        <button id="add-task" className="add-button" onClick={() => addTasks()}>
          Add
        </button>
      </div>
      <div className="tasks-list">
        {tasks
          ? tasks.map((task) => (
              <div className="task-item" key={task.id}>
                {!isActiveSelected && task.completed ? (
                  <span
                    className="material-icons selected-checkbox"
                    onClick={() => toggleTaskStatus(task)}
                  >
                    check_box
                  </span>
                ) : !isCompletedSelected && !task.completed ? (
                  <span
                    className="material-icons blank-checkbox"
                    onClick={() => toggleTaskStatus(task)}
                  >
                    check_box_outline_blank
                  </span>
                ) : null}
                <span
                  className={`item-desc ${
                    task.completed ? "task-completed" : "task-incomplete"
                  } ${
                    isActiveSelected
                      ? "active-selected"
                      : isCompletedSelected
                      ? "completed-selected"
                      : ""
                  }`}
                >
                  {task.name}
                </span>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default App;
