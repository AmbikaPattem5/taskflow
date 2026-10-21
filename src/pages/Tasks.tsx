import { useState } from "react"
import CreateTask from "../features/tasks/components/CreateTask"
function Tasks() {
    const [createTaskModal, setCreateTaskModal] = useState(false)
    return (
        <div>
            <input className="border border-gray-300" />
            <button onClick={() => setCreateTaskModal(true)}>New Task</button>
            {createTaskModal && <CreateTask onClose={() => setCreateTaskModal(false)} />}

        </div>
    )
}
export default Tasks