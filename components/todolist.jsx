'use client'

import Menus from "@/components/menus";
import { useGlobalColor } from "@/store/background";
import { useState } from "react";
import axios from 'axios';

const ToDoList = () => {
    const globalColor = useGlobalColor((state) => state.globalColor)

    const [tasks, setTasks] = useState(["Study HTML"]);
    const [newTask, setNewTask] = useState("");

    const addTask = async (task) => {
        try {
            console.log("Sending request to add task:", task);
            const response = await axios.post(`${process.env.NEXT_PUBLIC_AZURE_ADD_TASK_FUNCTION_KEY}`, { task });
            console.log("Response received:", response);
            setTasks([...tasks, task]);
        } catch (error) {
            console.error("There was a network error:", error);
            if (error.response) {
                console.error("Server responded with status:", error.response.status);
            }
        }
    };

    const handleAddTask = async (event) => {
        event.preventDefault();
        if (newTask.trim() !== "") {
            await addTask(newTask);
            setNewTask("");
        }
    };

    const handleDeleteTask = async (index) => {
        try {
            console.log("Sending request to delete task:", index);
            const response = await axios.post(`${process.env.NEXT_PUBLIC_AZURE_DELETE_TASK_FUNCTION_KEY}`, { index });
            console.log("Response received:", response);
            const updatedTasks = tasks.filter((_, i) => i !== index);
            setTasks(updatedTasks);
        } catch (error) {
            console.error("There was a network error:", error);
        }
    };

    const handleEditTask = async (index) => {
    const newText = prompt("Enter new task", tasks[index]);
    if (newText !== null) {
        await axios.post(`${process.env.NEXT_PUBLIC_AZURE_EDIT_TASK_FUNCTION_KEY}`, { index, newText });
        const updatedTasks = [...tasks];
        updatedTasks[index] = newText.trim();
        setTasks(updatedTasks);
    }
};


    const handleToggleComplete = async (index) => {
        await axios.post(`${process.env.NEXT_PUBLIC_AZURE_COMPLETE_TASK_FUNCTION_KEY}`, { index });
        const task = document.getElementById(`task-${index}`);
        if (task.classList.contains('completed')) {
            task.classList.remove('completed');
        } else {
            task.classList.add('completed');
        }
    };

    return (
        <div>
            <div className="text-white text-lg font-bold p-10 w-full"
                style={{ backgroundColor: `#${globalColor}` }} >
                <div className="md:w-1/3 mx-auto text-gray-500 dark:text-gray-400 text-sm sm:text-lg">
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <form onSubmit={handleAddTask}>
                            <div className="flex">
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 mr-2  rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
                                    value={newTask}
                                    onChange={(e) => setNewTask(e.target.value)}
                                    placeholder="Add your To Do List"
                                    required
                                />
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                style={{ backgroundColor: `#${globalColor}` }}>
                                    Add
                                </button>
                            </div>
                        </form>
                        <ul>
                            {tasks.map((task, index) => (
                                <li
                                    key={index}
                                    id={`task-${index}`}
                                    className="border-b border-gray-200 flex items-center justify-between py-4"
                                >
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            onChange={() => handleToggleComplete(index)}
                                        />
                                        <span>{task}</span>
                                    </label>
                                    <div >
                                        <button 
                                            className="text-red-500 hover:text-red-700 mr-2"
                                            onClick={() => handleDeleteTask(index)}
                                            style={{ color: `#${globalColor}` }}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="text-blue-500 hover:text-blue-700"
                                            onClick={() => handleEditTask(index)}
                                            style={{ color: `#${globalColor}` }}
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ToDoList
