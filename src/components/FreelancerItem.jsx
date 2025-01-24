import { useNavigate } from "react-router-dom";

const FreelancerItem = (props) => {
    const navigate = useNavigate();

    return <tr className="cursor-pointer hover:bg-base-200" onClick={() => { navigate('/freelancer/' + props.freelancer._id); }}>
        <td>{props.freelancer.first_name} {props.freelancer.last_name}</td>
        <td>{props.freelancer.email}</td>
        <td>{props.freelancer.activated_at ? <div className="badge-success w-min px-2 py-1 rounded-lg text-xs">Active</div> : <div className="badge-error w-min px-2 py-1 rounded-lg text-xs">Inactive</div>}</td>
    </tr>
}

export default FreelancerItem;