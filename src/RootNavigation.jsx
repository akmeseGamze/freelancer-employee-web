import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import { useAuth } from "./providers/AuthenticationProvider";
import FreelancerShow from "./pages/FreelancerShow";

const RootNavigation = () => {
    const auth = useAuth();

    if (auth.token) {
        return <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/freelancer/:id" element={<FreelancerShow />} />
        </Routes>
    } else {
        return <Routes>
            <Route path="/" element={<Auth />} />
        </Routes>;
    }
}

export default RootNavigation;