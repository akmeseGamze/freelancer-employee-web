import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../providers/AuthenticationProvider";
import config from "../constants/config";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TaskItem from "../components/TaskItem";

const FreelancerShow = () => {
    const { id } = useParams();
    const auth = useAuth();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const activateFreelancer = useCallback(async () => {
        try {
            if (loading) {
                return;
            }
            setLoading(true);
            const response = await axios(config.api + "/api/v1/employee/freelancer/activate", {
                method: "POST",
                data: JSON.stringify({
                    id: id,
                    authentication_token: auth.token,
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response || !response.data.freelancer) {
                setLoading(false);
                return;
            }

            const newData = {
                freelancer: response.data.freelancer,
                tasks: data.tasks,
            };

            setData(newData);
            setLoading(false);
        } catch (e) { }
    }, [auth, loading, setLoading, id, data]);

    const fetchData = useCallback(async () => {
        try {
            if (loading) {
                return;
            }
            setLoading(true);
            const response = await axios(config.api + "/api/v1/employee/freelancer/task/list", {
                method: "POST",
                data: JSON.stringify({
                    id: id,
                    authentication_token: auth.token,
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response || !response.data.tasks) {
                setLoading(false);
                return;
            }

            setData(response.data);
            setLoading(false);
        } catch (e) { }
    }, [auth, loading, setLoading, id]);

    useEffect(() => {
        if (!data && !loading) {
            fetchData();
        }
    }, [data, loading]);

    const showLoadingIndicator = useCallback(() => {
        if (!data) {
            return true;
        }

        return loading;
    }, [data, loading]);

    return <>
        {data && <div className="bg-base-100 flex flex-col h-dvh">
            <h1 className="text-2xl font-bold p-6">{data.freelancer.first_name} {data.freelancer.last_name}</h1>
            <p className="px-6"><span>E-Mail: </span><span className="font-bold">{data.freelancer.email}</span></p>
            <p className="px-6"><span>Phone: </span><span className="font-bold">{data.freelancer.phone_number}</span></p>
            <div className="px-6 mt-2"><button className="link link-primary" onClick={() => { navigate('/') }}>Back</button></div>
            {!data.freelancer.activated_at ? <div className="px-6 mt-2"><button className="btn btn-primary" onClick={() => { activateFreelancer(); }}>Activate</button></div> : null}
            {data.freelancer.about && <p className="px-6">{data.freelancer.about}</p>}
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Created at</th>
                            <th>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.tasks.map((item) => {
                            return <TaskItem key={item._id} task={item} />
                        })}
                    </tbody>
                </table>
            </div>
        </div>}
        {showLoadingIndicator() && <div className="fixed bg-base-100 inset-0 flex flex-col items-center justify-center"><span className="loading loading-spinner"></span></div>}
    </>
}

export default FreelancerShow;