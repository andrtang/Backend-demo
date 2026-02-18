import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  async function loadTasks() {
    setErrMsg("");
    setLoading(true);
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      setErrMsg("Failed to load tasks. Is the backend running on port 5001?");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function addTask(e) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    setErrMsg("");
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: trimmed, completed: false }),
      });
      const created = await res.json();
      setTasks((prev) => [created, ...prev]);
      setTitle("");
    } catch (err) {
      setErrMsg("Failed to add task.");
    }
  }

  async function toggleTask(task) {
    // Your backend sample didn’t include PUT/PATCH.
    // So we “simulate” toggle by delete+recreate for demo simplicity,
    // OR you can add a PATCH endpoint later.
    setErrMsg("");
    try {
      // If your backend has PATCH, use it (recommended). Otherwise this will just no-op.
      const res = await fetch(`/api/tasks/${task._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      });

      if (res.ok) {
        const updated = await res.json();
        setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
      } else {
        // If PATCH not implemented, show a friendly message.
        setErrMsg("Toggle needs a PATCH endpoint. Delete still works for demo.");
      }
    } catch {
      setErrMsg("Failed to toggle task.");
    }
  }

  async function deleteTask(id) {
    setErrMsg("");
    try {
      await fetch(`/api/tasks/${id}`, { method: "DELETE" });
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setErrMsg("Failed to delete task.");
    }
  }

  return (
    <div className="page">
      <div className="card">
        <h1>Tasks Demo</h1>
        <p className="subtitle">
          React frontend → Express API → MongoDB
        </p>

        <form onSubmit={addTask} className="row">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a task..."
            className="input"
          />
          <button className="button" type="submit">Add</button>
          <button className="button secondary" type="button" onClick={loadTasks}>
            Refresh
          </button>
        </form>

        {errMsg && <div className="error">{errMsg}</div>}

        {loading ? (
          <div className="muted">Loading…</div>
        ) : tasks.length === 0 ? (
          <div className="muted">No tasks yet. Add one above.</div>
        ) : (
          <ul className="list">
            {tasks.map((t) => (
              <li key={t._id} className="item">
                <label className="task">
                  <input
                    type="checkbox"
                    checked={!!t.completed}
                    onChange={() => toggleTask(t)}
                  />
                  <span className={t.completed ? "done" : ""}>{t.title ?? "(untitled)"}</span>
                </label>

                <button className="button danger" onClick={() => deleteTask(t._id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="footer">
          <code>GET /api/tasks</code> &nbsp; <code>POST /api/tasks</code> &nbsp; <code>DELETE /api/tasks/:id</code>
        </div>
      </div>
    </div>
  );
}

export default App;
