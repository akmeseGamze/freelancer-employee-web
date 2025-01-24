import { useCallback, useState } from "react";
import { useAuth } from "../providers/AuthenticationProvider";

const Auth = () => {
    const { signIn } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const doSignIn = useCallback(async () => {
        setLoading(true);
        await signIn(email, password);
        setLoading(false);
    }, [signIn, email, password]);

    return <>
        <div className="bg-base-100 flex flex-col justify-center h-dvh items-center">
            <h1 className="text-2xl font-bold">Sign in</h1>
            <input onChange={(event) => { setEmail(event.target.value) }} type="email" placeholder="E-Mail" className="input input-bordered w-full max-w-xs mt-24" />
            <input onChange={(event) => { setPassword(event.target.value) }} type="password" placeholder="Password" className="input input-bordered w-full max-w-xs mt-2" />
            <div className="divider"></div>
            <button onClick={() => {
                doSignIn();
            }} className="btn btn-primary w-full max-w-xs">Sign in</button>
        </div>
        {loading && <div className="fixed bg-base-100 inset-0 flex flex-col items-center justify-center"><span className="loading loading-spinner"></span></div>}
    </>
};

export default Auth;