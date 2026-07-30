import { useEffect, useState } from 'react'

const STORAGE_KEY = 'todo-app.tasks'

// Load tasks from LocalStorage once, when the app starts.
function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const FILTERS = {
  all: () => true,
  active: (t) => !t.done,
  done: (t) => t.done,
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks)
  const [draft, setDraft] = useState('')
  const [filter, setFilter] = useState('all')

  // Save to LocalStorage whenever tasks change.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  function addTask(e) {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    setTasks((prev) => [
      { id: crypto.randomUUID(), text, done: false },
      ...prev,
    ])
    setDraft('')
  }

  function toggle(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }

  function remove(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  function clearDone() {
    setTasks((prev) => prev.filter((t) => !t.done))
  }

  const visible = tasks.filter(FILTERS[filter])
  const remaining = tasks.filter((t) => !t.done).length

  return (
    <div className="min-h-full flex flex-col items-center px-4 py-10 sm:py-16">
      <header className="w-full max-w-lg">
        <p className="font-display text-sm font-medium uppercase tracking-[0.2em] text-teal">
          Tasks
        </p>
        <h1 className="mt-1 font-display text-3xl font-bold text-ink">
          Today's list
        </h1>
        <p className="mt-2 text-sm text-muted">
          Your tasks are saved in this browser, so they'll still be here next time.
        </p>
      </header>

      <form onSubmit={addTask} className="mt-6 w-full max-w-lg">
        <div className="flex gap-2">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Add a task and press Enter"
            aria-label="New task"
            className="flex-1 rounded-xl border border-black/10 bg-card px-4 py-3 text-ink shadow-soft outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/30"
          />
          <button
            type="submit"
            className="rounded-xl bg-ink px-5 py-3 font-medium text-white transition hover:bg-teal-dark focus:outline-none focus:ring-2 focus:ring-teal/40"
          >
            Add
          </button>
        </div>
      </form>

      <main className="mt-6 w-full max-w-lg">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex gap-1">
            {Object.keys(FILTERS).map((key) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={
                  'rounded-lg px-3 py-1.5 text-sm capitalize transition ' +
                  (filter === key
                    ? 'bg-ink text-white'
                    : 'text-muted hover:bg-black/5')
                }
              >
                {key}
              </button>
            ))}
          </div>
          <span className="text-sm text-muted">
            {remaining} left
          </span>
        </div>

        <ul className="space-y-2">
          {visible.map((task) => (
            <li
              key={task.id}
              className="group flex items-center gap-3 rounded-xl border border-black/5 bg-card px-4 py-3 shadow-soft"
            >
              <button
                onClick={() => toggle(task.id)}
                aria-label={task.done ? 'Mark as not done' : 'Mark as done'}
                className={
                  'grid h-5 w-5 shrink-0 place-items-center rounded-md border transition ' +
                  (task.done
                    ? 'border-teal bg-teal text-white'
                    : 'border-black/20 hover:border-teal')
                }
              >
                {task.done && (
                  <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.7 5.3a1 1 0 010 1.4l-7 7a1 1 0 01-1.4 0l-3-3a1 1 0 011.4-1.4L9 11.6l6.3-6.3a1 1 0 011.4 0z"
                    />
                  </svg>
                )}
              </button>

              <span
                className={
                  'flex-1 text-sm ' +
                  (task.done ? 'text-muted line-through' : 'text-ink')
                }
              >
                {task.text}
              </span>

              <button
                onClick={() => remove(task.id)}
                aria-label="Delete task"
                className="text-muted opacity-0 transition hover:text-red-500 focus:opacity-100 group-hover:opacity-100"
              >
                <svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor">
                  <path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </li>
          ))}
        </ul>

        {tasks.length === 0 && (
          <div className="rounded-2xl border border-dashed border-black/10 p-10 text-center">
            <p className="text-4xl">📝</p>
            <p className="mt-3 text-sm text-muted">
              Nothing here yet. Add your first task above.
            </p>
          </div>
        )}

        {visible.length === 0 && tasks.length > 0 && (
          <p className="py-8 text-center text-sm text-muted">
            No {filter} tasks.
          </p>
        )}

        {tasks.some((t) => t.done) && (
          <div className="mt-4 text-right">
            <button
              onClick={clearDone}
              className="text-sm text-muted underline-offset-2 transition hover:text-ink hover:underline"
            >
              Clear completed
            </button>
          </div>
        )}
      </main>

      <footer className="mt-auto pt-10 text-xs text-muted">
        Built with React &amp; Tailwind · Saved with LocalStorage
      </footer>
    </div>
  )
}
