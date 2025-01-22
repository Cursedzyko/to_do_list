import "../index.css";

const TaskDetail = ({ task, onClose }) => {
    if (!task) return null; // Do not render if no task is selected

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 ">
                <button
                    onClick={onClose}
                    className="float-right bg-gray-300 px-2 rounded-full text-gray-600 hover:bg-gray-400 transition"
                >
                    ×
                </button>
                <h2 className="text-xl font-semibold mb-4">{task.title}</h2>
                <div className="mb-4">
                    <p className="text-gray-700">
                        <span className="font-medium">Description:</span> {task.description}
                    </p>
                </div>
                <div className="mb-4">
                    <p className="text-gray-700">
                        <span className="font-medium">Category:</span> {task.category}
                    </p>
                </div>
                <div className="mb-4">
                    <p className="text-gray-700">
                        <span className="font-medium">Status:</span>{" "}
                        {task.done ? "Completed" : "Pending"}
                    </p>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskDetail;
