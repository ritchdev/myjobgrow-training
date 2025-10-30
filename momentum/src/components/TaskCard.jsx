import React, { useState } from "react";

function TaskCard({ task, toggleDone, deleteTask, editTask }) {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleSave = () => {
    if (!newText.trim()) return;
    editTask(task.id, newText);
    setEditing(false);
  };

  return (
    <div
      className={`bg-gray-900 px-5 py-3 w-full rounded-lg shadow-md flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 border-l-4 hover:bg-gray-800 transition ${
        task.done ? "border-green-500" : "border-sky-400"
      }`}
    >
      <div className="flex flex-col gap-2 w-full sm:w-auto">
        {editing ? (
          <input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="px-3 py-1 focus:outline-none"
          />
        ) : (
          <h2
            className={`font-display text-2xl break-words ${
              task.done ? "text-green-400 line-through" : "text-sky-400"
            }`}
          >
            {task.text}
          </h2>
        )}
      </div>

      <div className="flex gap-3 flex-wrap">
        {editing ? (
          <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded-md text-white font-roboto"
          >
            Save
          </button>
        ) : (
          <>
            <button
              onClick={() => toggleDone(task.id)}
              className={`px-4 py-1 rounded-md text-white font-roboto transition ${
                task.done
                  ? "bg-green-700 hover:bg-green-800"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {task.done ? "Undo" : "Done"}
            </button>
            <button
              onClick={() => setEditing(true)}
              className="bg-sky-500 hover:bg-sky-600 px-4 py-1 rounded-md text-white font-roboto"
            >
              Edit
            </button>
          </>
        )}
        <button
          onClick={() => deleteTask(task.id)}
          className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded-md text-white font-roboto"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
