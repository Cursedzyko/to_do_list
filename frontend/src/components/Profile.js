import "../index.css";
import { useEffect, useState } from "react";
import CreateTask from "./CreateTask";
import TaskDetail from "./TaskDetail";
import EditTask from "./EditTask";
import { profileUser, getTasks, deleteTask as deleteTaskApi } from "../api/api";
import Cookies from "js-cookie";
import { data, useNavigate } from "react-router-dom";

const Profile = () => {
    const [activeCategory, setActiveCategory] = useState("Home");
    const [tasks, setTasks] = useState([]);
    const [email, setEmail] = useState("");
    const [showCreateTask, setShowCreateTask] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null); // Track selected task
    const [editingTask, setEditingTask] = useState(null);


    const filteredTasks = tasks.filter((task) => task.category === activeCategory);
    const navigate = useNavigate();

    const toggleTaskStatus = (taskId) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, done: !task.done } : task
            )
        );
    };



    const handleEdit = (task) => {
        setEditingTask(task);
    };

    const addTask = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setShowCreateTask(false);
    };

    const deleteTask = async (taskId) => {
        const token = Cookies.get("access_token");
        try {
            await deleteTaskApi(token, taskId);
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const singout = () => {
        Cookies.remove("access_token");
        navigate("/");
    };

    useEffect(() => {
        const fetchData = async () => {
            const token = Cookies.get("access_token");
            try {
                const taskData = await getTasks(token);
                setTasks(taskData.tasks);
                setEmail(taskData.email)
            } catch (error) {
                console.error("Error fetching data:", error);
                if (error.response && error.response.status === 401) {
                    navigate("/");
                }
            }
        };

        fetchData();
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-gray-700 text-white py-4 px-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Task Manager</h1>
                <div className="flex items-center">
                    <span className="mr-4">{email}</span>
                    <button onClick={singout} className="bg-red-600 px-4 py-1 text-white rounded-lg hover:bg-red-700">
                        Sign Out
                    </button>
                </div>
            </header>

            {selectedTask && (
                <TaskDetail task={selectedTask} onClose={() => setSelectedTask(null)} />
            )}

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
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold">{activeCategory} Tasks</h2>
                        <button
                            onClick={() => setShowCreateTask(true)}
                            className="bg-blue-300 p-2 rounded-2xl flex gap-3 text-gray-600 font-medium hover:text-black hover:bg-blue-400 transition ease-in-out delay-150 hover:scale-110"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48" className="h-6 w-6 fill-black">
                                <path d="M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 35.027926 12.972066 44 24 44 C 35.027934 44 44 35.027926 44 24 C 44 12.972074 35.027934 4 24 4 z M 24 7 C 33.406615 7 41 14.593391 41 24 C 41 33.406609 33.406615 41 24 41 C 14.593385 41 7 33.406609 7 24 C 7 14.593391 14.593385 7 24 7 z M 23.976562 13.978516 A 1.50015 1.50015 0 0 0 22.5 15.5 L 22.5 22.5 L 15.5 22.5 A 1.50015 1.50015 0 1 0 15.5 25.5 L 22.5 25.5 L 22.5 32.5 A 1.50015 1.50015 0 1 0 25.5 32.5 L 25.5 25.5 L 32.5 25.5 A 1.50015 1.50015 0 1 0 32.5 22.5 L 25.5 22.5 L 25.5 15.5 A 1.50015 1.50015 0 0 0 23.976562 13.978516 z"></path>
                            </svg>
                            Add task
                        </button>
                    </div>
                    <div className="space-y-4">
                        {filteredTasks.map((task) => (
                            <div
                                key={task.id}
                                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-start justify-between"
                                
                            >
                                <input
                                    type="checkbox"
                                    checked={task.done}
                                    onChange={(e) => {
                                        e.stopPropagation();
                                        toggleTaskStatus(task.id);
                                    }}
                                    className="mr-4 floats-start h-7 w-4"
                                />
                                <div className="flex items-center  w-full"
                                    onClick={() => setSelectedTask(task)}
                                >
                                    <span
                                        className={`text-lg font-semibold flex-1 ${
                                            task.done ? "line-through text-gray-500" : ""
                                        }`}
                                    >
                                        {task.title}
                                    </span>
                                </div>
                                <button
                                    onClick={() => handleEdit(task)}
                                    className="text-blue-500 hover:text-blue-700 flex items-center"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="h-6 w-6 mr-1"
                                    >
                                        <path d="M14.06 2.94a2.5 2.5 0 013.54 0l3.46 3.46a2.5 2.5 0 010 3.54l-9.01 9.01a1 1 0 01-.33.21l-5 2a1 1 0 01-1.28-1.28l2-5a1 1 0 01.21-.33l9.01-9.01zm2.12 1.41a.5.5 0 00-.71 0l-9.01 9.01-1.36 3.39 3.39-1.36 9.01-9.01a.5.5 0 000-.71l-3.46-3.46zm-7.94 10.6a1 1 0 011.42 1.42l-2 2a1 1 0 01-1.42-1.42l2-2z"></path>
                                    </svg>
                                </button>
                                <button onClick={() => deleteTask(task.id)} className="text-red-500 hover:text-red-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6">
                                        <path fill="currentColor" d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9zm2 2h2v1h-2V5zM7 8h10v11H7V8zm2 2v7h2v-7H9zm4 0v7h2v-7h-2z"></path>
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {showCreateTask && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <CreateTask
                            onClose={() => setShowCreateTask(false)}
                            onAddTask={addTask}
                            activeCategory={activeCategory}
                        />
                    </div>
                )}

                {selectedTask && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <TaskDetail task={selectedTask} onClose={() => setSelectedTask(null)} />
                    </div>
                )}

                {editingTask && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <EditTask
                            task={editingTask}
                            onClose={() => setEditingTask(null)}
                            onUpdateTask={(updatedTask) => {
                                setTasks((prevTasks) =>
                                    prevTasks.map((task) =>
                                        task.id === updatedTask.id ? updatedTask : task
                                    )
                                );
                            }}
                        />
                    </div>
                )}
            </main>
        </div>
    );
};

export default Profile;
