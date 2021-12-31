import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [isAllSelected, setIsAllSelected] = useState(true);
  const [isActiveSelected, setIsActiveSelected] = useState(false);
  const [isCompletedSelected, setIsCompletedSelected] = useState(false);
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("toDoTasks") || "[]")
  );
  const [noCompletedTasks, setNoCompletedTasks] = useState(true);

  const deleteSingleTask = function (current_task) {
    let _tasks = tasks.slice();
    _tasks = _tasks.filter((task) => task.id !== current_task.id);
    setTasks(_tasks);
    localStorage.setItem("toDoTasks", JSON.stringify(_tasks));
  };

  const deleteAllTasks = function () {
    let _tasks = tasks.slice();
    _tasks = _tasks.filter((task) => !task.completed);
    setTasks(_tasks);
    localStorage.setItem("toDoTasks", JSON.stringify(_tasks));
  };

  const toggleTaskStatus = function (current_task) {
    const _tasks = tasks.slice();
    _tasks.map((task) =>
      current_task.id === task.id ? (task.completed = !task.completed) : null
    );
    setTasks(_tasks);
    localStorage.setItem("toDoTasks", JSON.stringify(_tasks));
  };

  const addTasks = function (e) {
    e.preventDefault();
    const input_element = document.getElementById("add-details");
    const name = input_element.value;
    const _tasks = tasks.slice();
    name &&
      _tasks.push({ name, completed: false, id: new Date().getTime() }) &&
      localStorage.setItem("toDoTasks", JSON.stringify(_tasks));
    setTasks(_tasks);
    input_element.value = null;
  };

  useEffect(() => {
    setNoCompletedTasks(!tasks?.some((task) => task.completed));
  }, [tasks]);

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
      {!isCompletedSelected && (
        <form className="add-task-container">
          <input
            id="add-details"
            placeholder="add details"
            className="input-details"
          ></input>
          <button
            id="add-task"
            className="add-button"
            onClick={(e) => addTasks(e)}
          >
            Add
          </button>
        </form>
      )}
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
                {isCompletedSelected && task.completed && (
                  <div
                    className="delete-icon-container"
                    onClick={() => deleteSingleTask(task)}
                  >
                    <span className="material-icons delete-icon">
                      delete_outline
                    </span>
                  </div>
                )}
              </div>
            ))
          : null}
      </div>
      {!noCompletedTasks && isCompletedSelected && (
        <button
          id="delete-all"
          className="delete-all-button"
          onClick={() => deleteAllTasks()}
        >
          <span className="material-icons delete-icon">delete_outline</span>
          <span className="delete-all-button-text">delete all</span>
        </button>
      )}
    </div>
  );
}

export default App;
