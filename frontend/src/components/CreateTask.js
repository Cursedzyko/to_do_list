import { useState } from "react";
import "../index.css";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import {createTask } from '../api/api';

const CreateTask = ({ onClose, onAddTask, activeCategory }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleAddTask = async () => {
        if (!title || !description) {
            setError("Both title and description are required.");
            return;
        }
        setError("");
        setLoading(true);
    
        try {
            const token = Cookies.get("access_token");
            
            // Prepare new task data
            const newTask = {
                "title": title,
                "description": description,
                "category": activeCategory,
                "done": false
            };
    
            // Call the backend to create the task
            const task = await createTask(token, newTask);
            
            onAddTask(task);
            // Handle successful task creation (e.g., update the UI)
            console.log("Task created successfully:", task);
            setLoading(false);
        } catch (error) {
            setError(error.message || "Failed to create task.");
            setLoading(false);
        }
    };
    
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Create Task</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
                <label htmlFor="title" className="block font-medium text-gray-700">
                    Title
                </label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter task title"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block font-medium text-gray-700">
                    Description
                </label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter task description"
                />
            </div>
            <div className="flex justify-end gap-4">
                <button
                    onClick={onClose}
                    className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                    Cancel
                </button>
                <button
                    onClick={handleAddTask}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add Task"}
                </button>
            </div>
        </div>
    );
};

CreateTask.propTypes = {
    onClose: PropTypes.func.isRequired,
    onAddTask: PropTypes.func.isRequired,
    activeCategory: PropTypes.string.isRequired,
};

export default CreateTask;
