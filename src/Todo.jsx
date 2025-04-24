import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleComplete, deleteTodo } from "./todoSlice";

const Todo = () => {
  const [text, setText] = useState("");
  const [deadline, setDeadline] = useState("");
  const [filter, setFilter] = useState("all");
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value); 
  };

  const handleAddTodo = () => {
    if (text && deadline) {
      dispatch(addTodo({ text, deadline }));
      setText("");
      setDeadline("");
    } 
  };

  const handleToggleComplete = (id) => {
    dispatch(toggleComplete(id));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const getDeadlineColor = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate - now;
    const hoursDiff = timeDiff / (1000 * 60 * 60); 

    if (timeDiff < 0) {
      return "red"; 
    } else if (hoursDiff <= 24) {
      return "orange"; 
    } else {
      return "green"; 
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") {
      return todo.completed;
    } else if (filter === "incomplete") {
      return !todo.completed;
    } else {
      return true;
    }
  });


  
  return (
    <div>
     <div style={{ display: "flex", gap: "40px" }}>
       <p>Запросить задачу</p>
       <p>Выбрать дедлайн</p> </div>
      <input
        type="text"
        value={text}
        onChange={handleInputChange}
      />
      <input
        type="datetime-local"
        value={deadline}
        onChange={handleDeadlineChange}
      />
      <button onClick={handleAddTodo}
      className=" bg-blue-500"
      
      >Add Todo</button>
      
  
      <div>
        <button onClick={() => setFilter("all")}>ВСЕ ЗАДАЧИ</button>
        <button onClick={() => setFilter("completed")}>ВЫПОЛНЕНЫЕ</button>
        <button onClick={() => setFilter("incomplete")}>В РАБОТЕ</button>
      </div>

      <ul>
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "gray" : getDeadlineColor(todo.deadline), 
            }}
          >
            <div>
              <strong>{todo.text}</strong>
              <br />
              {todo.completed ? (
                <small>Завершено: {new Date(todo.completionDate).toLocaleString()}</small>
              ) : (
                <small>Дедлайн: {new Date(todo.deadline).toLocaleString()}</small>
              )}
            </div>
            <button onClick={() => handleToggleComplete(todo.id)}>
              {todo.completed ? "✔️ " : "Отметить выполнены"}
            </button>
            <button onClick={() => handleDeleteTodo(todo.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;