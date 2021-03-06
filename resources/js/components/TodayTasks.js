import React, {useEffect, useState} from 'react';
import Layout from "./Layout";
import TaskList from "./TaskList";

function TodayTasks() {
    const [tasks, setTasks] = useState([]);

    const getTasks = () => axios.get("/api/task/today")
            .then((response) => setTasks(response.data));

    useEffect(getTasks,[]);

    const onCreate = (task) => {
        console.log(task);
        axios.post("/api/task", task)
            .then(getTasks);
    };

    const onUpdate = (taskId, task) => {
        axios.put("/api/task/" + taskId, task)
            .then(getTasks);
    };

    const onDelete = (taskId) => {
        axios.delete("/api/task/" + taskId)
            .then(response => {
                if (response.status == 200)
                    setTasks(tasks.filter((t) => t.id != taskId));
            });
    };

    return (
        <TaskList tasks={tasks} onCreate={onCreate} onUpdate={onUpdate} onDelete={onDelete}/>
    );
}

export default TodayTasks;
