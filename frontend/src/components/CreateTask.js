import { useState } from "react";
import "../index.css"
import PropTypes from "prop-types";

const CreateTask = (onClose, onAddTask, activeCategory) => {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();

    const handleAddTask = () =>{
        const newTask = {
            id: Date.now(),
            title,
            description,
            activeCategory,
            done: false
        };
        onAddTask(newTask)
    }

    return ( 
        <div className="bg-white">
            Create Task
        </div>    
    );
}

CreateTask.protoTypes = {
    onClose: PropTypes.func.isRequired,
    onAddTask: PropTypes.func.isRequired,
    activeCategory: PropTypes.string.isRequired
}

export default CreateTask;