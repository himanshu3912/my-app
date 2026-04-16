"use client";
import { useState, useEffect } from "react";

export default function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  // Fetch todos
  const fetchTodos = async () => {
    const res = await fetch("/api/todos");
    const json = await res.json();
    if (json.success) setTodos(json.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add new todo
  const addTodo = async () => {
    if (!task.trim()) return;
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task }),
    });
    const json = await res.json();
    if (json.success) {
      setTodos([json.data, ...todos]);
      setTask("");
    }
  };

  // Update todo
  const updateTodo = async (id, updates) => {
    const res = await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    const json = await res.json();
    if (json.success) {
      setTodos(todos.map((t) => (t._id === id ? json.data : t)));
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await fetch(`/api/todos/${id}`, { method: "DELETE" });
    setTodos(todos.filter((t) => t._id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Focus Tasks</h1>

      {/* Add new task */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="What's your next move?"
          className="border p-2 flex-1 rounded"
        />
        <button
          onClick={addTodo}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Table format */}
      <table className="w-full border-collapse border shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border p-3">Task</th>
            <th className="border p-3">Status</th>
            <th className="border p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo._id} className="hover:bg-gray-100">
              <td className="border p-3">{todo.task}</td>
              <td className="border p-3">
                <select
                  onChange={(e) => {
                    const action = e.target.value;
                    if (action === "toggle") {
                      updateTodo(todo._id, { completed: !todo.completed });
                    }
                    e.target.value = "";
                  }}
                  defaultValue=""
                  className="bg-green-500 text-white px-3 py-1 rounded cursor-pointer"
                >
                  <option value="" disabled>
                    {todo.completed ? "Completed ✅" : "Pending ⏳"}
                  </option>
                  <option value="toggle">
                    {todo.completed ? "Mark Pending" : "Mark Complete"}
                  </option>
                </select>
              </td>
              <td className="border p-3">
                <select
                  onChange={(e) => {
                    const action = e.target.value;
                    if (action === "delete") deleteTodo(todo._id);
                    if (action === "edit") {
                      const newTask = prompt("Edit task:", todo.task);
                      if (newTask) updateTodo(todo._id, { task: newTask });
                    }
                    e.target.value = "";
                  }}
                  defaultValue=""
                  className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
                >
                  <option value="" disabled>
                    Actions ⚙️
                  </option>
                  <option value="edit">✏️ Edit</option>
                  <option value="delete">🗑 Delete</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
