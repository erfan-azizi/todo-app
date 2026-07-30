# Todo App

A simple, responsive task manager built with **React**, **Vite**, and **Tailwind CSS**. Add tasks, mark them done, filter, and delete them — everything is saved in your browser with **LocalStorage**, so your list is still there when you come back.

## Features

- ➕ Add, complete, and delete tasks
- 💾 Tasks persist in the browser via LocalStorage
- 🗂️ Filter by All / Active / Done
- 🧹 Clear all completed tasks at once
- 🔢 Live count of remaining tasks
- 📱 Fully responsive layout

## Tech stack

- React 18 (`useState`, `useEffect`)
- Vite
- Tailwind CSS
- Browser LocalStorage API

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Build for production
npm run build
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## How it works

- Tasks are held in React state and rendered as a list.
- A `useEffect` hook writes the task list to LocalStorage whenever it changes.
- On startup, the app reads any saved tasks back from LocalStorage.

## Project structure

```
src/
  App.jsx      # main component: state, LocalStorage, task list UI
  main.jsx     # React entry point
  index.css    # Tailwind + fonts
```

---

Built by **Erfan Azizi** as a front-end practice project.
