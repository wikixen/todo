import { SetStateAction, useState } from "react";
import "./App.css";
import { Dispatch } from "react";

interface Todo {
  id: number;
  name: string;
  completed: boolean;
}

// nextId creates an ID for the Todo
let nextId = 0;

function TodoForm(
  { todos, setTodos }: {
    todos: Todo[];
    setTodos: Dispatch<SetStateAction<Todo[]>>;
  },
) {
  const [todo, setTodo] = useState("");

  return (
    <>
      <label>
        Enter your Todo:<br />
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
      </label>
      <input
        type="submit"
        value="Add"
        onClick={() => {
          setTodos([
            ...todos,
            {
              id: nextId++,
              name: todo,
              completed: false,
            },
          ]);
        }}
      />
    </>
  );
}

function TodoList({ todos, setTodos }: { todos: Todo[]; setTodos: Dispatch<SetStateAction<Todo[]>>}) {
  return (
    <>
      <h3>Your Todos</h3>
      <ul>
        {todos.map((todo, i) => (
          <TodoRow todo={todo} todos={todos} setTodos={setTodos}/>
        ))}
      </ul>
    </>
  );
}

function TodoRow({ todo, todos, setTodos }: { todo: Todo, todos: Todo[]; setTodos: Dispatch<SetStateAction<Todo[]>> }) {
  function handleCompleteClick() {
    const updateTodo = todos.map((t,i) => {
      if (i === todo.id) {
        t.completed = !t.completed
        return t
      } else {
        return t
      }
    })

    setTodos(updateTodo)
  }

  function handleDeleteClick() {
    setTodos(
      todos.filter(t =>
        t.id !== todo.id
      )
    );
  }

  if (!todo.completed) {
    return (
      <li key={todo.id}>
        <input type="checkbox" onClick={handleCompleteClick} />
        {todo.name}
        <input type="button" value="Delete" onClick={handleDeleteClick} />
      </li>
    );
  } else {
    return (
      <li key={todo.id}>
        <input type="checkbox" onClick={handleCompleteClick} />
        <s>{todo.name}</s>
        <input type="button" value="Delete" onClick={handleDeleteClick} />
      </li>
    );
  }

}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <>
      <TodoForm todos={todos} setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos}/>
    </>
  );
}
