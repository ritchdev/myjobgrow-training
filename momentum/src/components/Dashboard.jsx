import React, { useState } from "react";
import TaskCard from "./TaskCard";
import TaskInput from "./TaskInput";

function Dashboard() {
    const [tasks, setTasks] = useState([]);

    const addTask = (taskText) => {
        if (!taskText.trim()) return;
        setTasks((prev) => [
            ...prev,
            { id: Date.now(), text: taskText, done: false },
        ]);
    };

    const toggleDone = (id) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, done: !task.done } : task
            )
        );
    };

    const deleteTask = (id) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    const editTask = (id, newText) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, text: newText } : task
            )
        );
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center py-5 px-5 font-mono">
            <h1 className="font-logo text-4xl">Momentum</h1>

            <TaskInput addTask={addTask} />

            <div className="tasks mt-10 flex flex-col gap-5 w-full">
                {tasks.length === 0 ? (
                    <p className="text-gray-400 font-roboto text-center mt-10">
                        No tasks yet — start adding some!
                    </p>
                ) : (
                    tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            toggleDone={toggleDone}
                            deleteTask={deleteTask}
                            editTask={editTask}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default Dashboard;
