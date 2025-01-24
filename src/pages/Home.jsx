import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../providers/AuthenticationProvider";
import config from "../constants/config";
import axios from "axios";
import FreelancerItem from "../components/FreelancerItem";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useNavigate } from "react-router-dom";

const Home = () => {
    const auth = useAuth();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchData = useCallback(async () => {
        try {
            if (loading) {
                return;
            }
            setLoading(true);
            const response = await axios(config.api + "/api/v1/employee/dashboard", {
                method: "POST",
                data: JSON.stringify({
                    authentication_token: auth.token,
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response || !response.data.freelancers) {
                setLoading(false);
                return;
            }

            var newData = response.data;

            const labels = [];
            const taskCounts = [];
            const today = new Date();

            for (let i = 29; i >= 0; i--) {
                const date = new Date();
                date.setDate(today.getDate() - i);
                const formattedDate = date.toISOString().slice(0, 10); // YYYY-MM-DD
                labels.push(formattedDate);
                taskCounts.push(0); // Initialize with 0
            }

            response.data.data.tasks_created_last_30_days.forEach(task => {
                const taskDate = new Date(task.createdAt).toISOString().slice(0, 10);
                const index = labels.indexOf(taskDate);
                if (index !== -1) {
                    taskCounts[index]++;
                }
            });

            newData["tasks_created_last_30_days"] = {
                labels,
                datasets: [
                    {
                        label: 'Tasks Created',
                        data: taskCounts,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    },
                ],
            };

            setData(newData);
            setLoading(false);
        } catch (e) { console.log(e); }
    }, [auth, loading, setLoading]);

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
        {data && <div className="bg-base-100 flex flex-col">
            <h1 className="text-2xl font-bold p-6">Dashboard</h1>
            {data.data.most_valuable_freelancer ? <div className="px-6 mx-auto w-full">
                <div className="stat place-items-center">
                    <div className="stat-title">Most Valuable Freelancer</div>
                    <div className="stat-value cursor-pointer" onClick={() => { navigate('/freelancer/' + data.data.most_valuable_freelancer._id); }}>{data.data.most_valuable_freelancer.first_name} {data.data.most_valuable_freelancer.last_name}</div>
                    <div className="stat-desc">{data.data.most_valuable_freelancer.email}</div>
                </div>
            </div> : null}
            <div className="px-6 w-full mx-auto">
                <div className="max-w-screen-md border border-base-200 rounded-lg p-6 mx-auto w-full">
                    <Bar options={{
                        indexAxis: 'x',
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Tasks Created in Last 30 Days'
                            }
                        },
                        maintainAspectRatio: true,
                        scales: {
                            x: {
                                grid: {
                                    display: false,
                                },
                            },
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    stepSize: 1,
                                },
                            },
                        },
                    }} data={data.tasks_created_last_30_days} />
                </div>
            </div>
            <div className="overflow-x-auto mt-12">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Contact</th>
                            <th>State</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.freelancers.map((item) => {
                            return <FreelancerItem key={item._id} freelancer={item} />
                        })}
                    </tbody>
                </table>
            </div>
        </div>}
        {showLoadingIndicator() && <div className="fixed bg-base-100 inset-0 flex flex-col items-center justify-center"><span className="loading loading-spinner"></span></div>}
    </>
}

export default Home;