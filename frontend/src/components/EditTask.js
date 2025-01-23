import { useState } from "react";
import "../index.css";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { updateTask } from "../api/api";

const EditTask = ({ task, onClose, onUpdateTask }) => {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [category, setCategory] = useState(task.category);
    const [done, setDone] = useState(task.done);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleUpdateTask = async () => {
        if (!title || !description) {
            setError("All fields are required.");
            return;
        }
        setCategory(task.category)
        setError("");
        setLoading(true);

        try {
            const token = Cookies.get("access_token");
            const updatedTask = {
                "title": title,
                "description": description,
                "category": category,
                "done": done,
            };
            const taskResponse = await updateTask(token, task.id, updatedTask);
            console.log(taskResponse.task)
            onUpdateTask(updatedTask);
            setLoading(false);
            onClose();
        } catch (err) {
            setError(err.message || "Failed to update task.");
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
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
                />
            </div>
            <div className="mb-4">
                <label htmlFor="done" className="block font-medium text-gray-700">
                    Status
                </label>
                <input
                    id="done"
                    type="checkbox"
                    checked={done}
                    onChange={(e) => setDone(e.target.checked)}
                    className="mt-1"
                />
                <span className="ml-2">{done ? "Completed" : "Pending"}</span>
            </div>
            <div className="flex justify-end gap-4">
                <button
                    onClick={onClose}
                    className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                    Cancel
                </button>
                <button
                    onClick={handleUpdateTask}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Update Task"}
                </button>
            </div>
        </div>
    );
};

EditTask.propTypes = {
    task: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onUpdateTask: PropTypes.func.isRequired,
};

export default EditTask;
