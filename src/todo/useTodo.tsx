import React from "react";

// "todos": [],
// "total": 254,
// "skip": 0,
// "limit": 30

export interface Todos {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

interface TodoResponse {
  todos: Array<Todos>;
  total: number;
  skip: number;
  limit: number;
}

function useTodo() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [todos, setTodos] = React.useState<Array<Todos>>([]);

  React.useEffect(() => {
    (async () => {
      try {
        const { todos, total }: TodoResponse = await fetch(
          "https://dummyjson.com/todos"
        ).then((res) => {
          return res.json();
        });

        if (total > 0) {
          setTodos(todos);
        }
      } catch {
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { loading, todos, setTodos };
}

export default useTodo;
