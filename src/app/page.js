"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function TodoPage() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(true)

  // Edit ke liye states
  const [editing, setEditing] = useState(null)
  const [editValue, setEditValue] = useState("")

  // Fetch todos
  const fetchTodos = async () => {
    try {
      const res = await fetch('/api/todos')
      const json = await res.json()
      if (json.success) setTodos(json.data)
    } catch (error) {
      console.error('Failed to fetch:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  // Add todo
  const addTodo = async (e) => {
    e.preventDefault()
    if (!input) return
    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: input }),
      })
      const json = await res.json()
      if (json.success) {
        setTodos([json.data, ...todos])
        setInput('')
      }
    } catch (error) {
      console.error('Failed to add:', error)
    }
  }

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      const res = await fetch(`/api/todos/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setTodos(todos.filter((t) => t._id !== id))
      }
    } catch (error) {
      console.error('Failed to delete:', error)
    }
  }

  // Toggle todo
  const toggleTodo = async (id, completed) => {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed }),
      })
      const json = await res.json()
      if (json.success) {
        setTodos(todos.map((t) => (t._id === id ? json.data : t)))
      }
    } catch (error) {
      console.error('Failed to toggle:', error)
    }
  }

  // Edit todo
  async function editTodo(id, updatedTask) {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: updatedTask }),
      })
      const json = await res.json()
      if (json.success) {
        setTodos(todos.map(todo => todo._id === id ? json.data : todo))
      }
    } catch (error) {
      console.error("Failed to edit:", error)
    }
  }
// Local-only delete (does not call backend)
const deleteTodoLocal = (id) => {
  setTodos(todos.filter((t) => t._id !== id));
};

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl border border-slate-100 overflow-hidden">
        <div className="bg-blue-600 p-8 text-white text-center">
          <h1 className="text-3xl font-bold tracking-tight">Focus Tasks</h1>
          <p className="mt-2 text-pink-100 font-medium italic">Simple, smooth, and styled.</p>
        </div>

        <div className="p-8">
          <form onSubmit={addTodo} className="flex gap-3 mb-8">
            <input
              type="text"
              className="flex-1 rounded-xl border-slate-200 border-2 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="What's your next move?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 active:scale-95 transition-all">
              Add
            </button>
          </form>

          {loading ? (
            <div className="text-center py-10 text-slate-400 animate-pulse">Loading your tasks...</div>
          ) : (
            <div className="space-y-3">
              {todos.length === 0 ? (
                <p className="text-center text-slate-400 italic">No tasks today. Enjoy!</p>
              ) : (
                todos.map((todo) => (
                  <div key={todo._id} className="group flex flex-col p-4 bg-slate-50 rounded-xl border border-transparent hover:border-blue-100 transition-all shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => toggleTodo(todo._id, todo.completed)}
                          className="w-6 h-6 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                        <span className={`${todo.completed ? 'line-through text-slate-300' : 'text-slate-700 font-medium'}`}>
                          {todo.task}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditing(todo._id)
                            setEditValue(todo.task)
                          }}
                          className="text-slate-400 hover:text-blue-500 text-sm font-bold"
                        >
                          Edit
                        </button>
                        <button
  onClick={() => deleteTodoLocal(todo._id)}
  className="text-slate-400 hover:text-red-500 text-sm font-bold"
>
  Delete
</button>

                      </div>
                    </div>

                    {editing === todo._id && (
                      <div className="flex gap-2 mt-2">
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="border rounded px-2 py-1 flex-1"
                        />
                        <button
                          onClick={() => {
                            editTodo(todo._id, editValue)
                            setEditing(null)
                          }}
                          className="text-green-600 hover:text-green-800 text-sm font-bold"
                        >
                          Save
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <Link href="/about" className="mt-10 text-slate-400 font-medium hover:text-blue-500 transition-colors">
        About this project →
      </Link>
      <Link href="/company" className="mt-10 text-slate-400 font-medium hover:text-blue-500 transition-colors">
        Company →
      </Link>
    </div>
  )
}
