import "../index.css";
import { useState } from "react";

const Profile = () => {
    const [activeCategory, setActiveCategory] = useState("Home");
    const [tasks, setTasks] = useState([
        { id: 1, title: "Task 1", description: "This is task 1", category: "Home", done: false },
        { id: 2, title: "Task 2", description: "This is task 2", category: "Projects", done: false },
        { id: 3, title: "Task 3", description: "This is task 3", category: "Home", done: false },
    ]);

    const [email] = useState("user@example.com");

    const filteredTasks = tasks.filter((task) => task.category === activeCategory);

    // Toggle task status (done or not)
    const toggleTaskStatus = (taskId) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, done: !task.done } : task
            )
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-gray-700 text-white py-4 px-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Task Manager</h1>
                <div className="flex items-center">
                    <span className="mr-4">{email}</span>
                    <button className="bg-red-600 px-4 py-1 text-white rounded-lg hover:bg-red-700">
                        Sign Out
                    </button>
                </div>
            </header>

            <main className="flex flex-grow overflow-hidden">
                {/* Sidebar */}
                <div className="w-1/5 p-6 bg-gray-800 text-white">
                    <h2 className="mb-6 text-lg font-bold">Categories</h2>
                    <ul>
                        <li
                            className={`cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-700 ${activeCategory === "Home" ? "bg-gray-600" : ""}`}
                            onClick={() => setActiveCategory("Home")}
                        >
                            Home
                        </li>
                        <li
                            className={`cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-700 ${activeCategory === "Projects" ? "bg-gray-600" : ""}`}
                            onClick={() => setActiveCategory("Projects")}
                        >
                            Projects
                        </li>
                    </ul>
                </div>

                {/* Tasks Box */}
                <div className="w-full p-6 bg-gray-100 overflow-y-auto">
                    <h2 className="mb-6 text-xl font-semibold">{activeCategory} Tasks</h2>
                    <div className="space-y-4">
                        {filteredTasks.map((task) => (
                            <div
                                key={task.id}
                                className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-between`}
                            >
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={task.done}
                                        onChange={() => toggleTaskStatus(task.id)}
                                        className="mr-4"
                                    />
                                    <a href="#" className={`text-lg font-semibold ${task.done ? "line-through text-gray-500" : ""}`}>
                                        {task.title}
                                    </a>
                                </div>
                                <p className={`text-gray-600 ${task.done ? "line-through text-gray-500" : ""}`}>
                                    {task.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profile;
