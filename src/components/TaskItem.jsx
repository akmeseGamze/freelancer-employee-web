const TaskItem = (props) => {

    return <tr>
        <td >
            <div className="flex flex-col">
                <p className="whitespace-nowrap">{props.task.title}</p>
                <p>{props.task.state == 'todo' ? <div className="badge-info w-min px-2 py-1 rounded-lg text-xs whitespace-nowrap">ToDo</div> : props.task.state == 'in_progress' ? <div className="badge-warning w-min px-2 py-1 rounded-lg text-xs whitespace-nowrap">In Progress</div> : <div className="badge-success w-min px-2 py-1 rounded-lg text-xs whitespace-nowrap">Done</div>}</p>
            </div>
        </td>
        <td>{props.task.description}</td>
        <td>{new Date(props.task.createdAt).toLocaleDateString(window.navigator.language, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })}</td>
        <td>{props.task.counter_duration ?? '-'}</td>
    </tr>
}

export default TaskItem;