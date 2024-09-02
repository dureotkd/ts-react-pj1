import "./app.css";

import Todo from "../todo/Todo";

import React from "react";

const App = () => {
  return (
    <div className="App">
      <header></header>
      <main>
        <Todo />
      </main>
      <footer></footer>
    </div>
  );
};

export default App;
