import React, { useState } from "react";

function TaskInput({ addTask }) {
  const [taskText, setTaskText] = useState("");

  const handleAdd = () => {
    if (taskText.trim()) {
      addTask(taskText);
      setTaskText("");
    }
  };

  return (
    <div className="flex flex-row items-center justify-center gap-10 mt-10 w-full">
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Enter a task..."
        className="w-0.8 flex-1 px-4 py-2 font-mono px-4 py-2 focus:outline-none"
      />
      <button
        onClick={handleAdd}
        className="font-subtext bg-green-600 hover:bg-green-700 font-display text-sm text-white px-6 py-2 rounded-md transition"
      >
        Add Task
      </button>
    </div>
  );
}

export default TaskInput;
