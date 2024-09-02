import useTodo, { Todos } from "./useTodo";

import React from "react";

function Todo() {
  const [todo, setTodo] = React.useState<string>("");
  const { loading, todos, setTodos } = useTodo();

  const submitTodoForm = (event: React.FormEvent) => {
    event.preventDefault();

    setTodos((prev) => {
      const clonePrev = [...prev];
      const lastId = clonePrev.reduce(
        (max, item) => (item.id > max ? item.id : max),
        0
      );

      clonePrev.unshift({
        id: lastId + 1,
        userId: 1,
        todo: todo,
        completed: false,
      });

      return clonePrev;
    });
  };

  const handleTodoInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(event.target.value);
  };

  const changeCompleted = (id: number) => {
    setTodos((prev) => {
      const clonePrev = [...prev];
      const findIndex = clonePrev.findIndex((item) => item.id === id);
      clonePrev[findIndex].completed = !clonePrev[findIndex].completed;
      return clonePrev;
    });
  };

  if (loading) {
    return <div>Todo Loading...</div>;
  }

  return (
    <div>
      <form onSubmit={submitTodoForm}>
        <input onChange={handleTodoInput} value={todo} />
      </form>
      <ul>
        {todos.map((item) => {
          return (
            <li key={item.id} style={{ marginTop: 12 }}>
              <p>title : {item.todo}</p>
              <p>completed : {item.completed ? "✔" : "❌"}</p>
              <p>
                completed - change :
                <input
                  type="checkbox"
                  defaultChecked={item.completed}
                  onChange={() => changeCompleted(item.id)}
                />
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Todo;
