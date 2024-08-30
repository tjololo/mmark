import {createLazyFileRoute} from '@tanstack/react-router'
import {useState} from "react";
import {googleLogout, useGoogleLogin} from "@react-oauth/google";


export const Route = createLazyFileRoute('/auth')({
    component: Auth,
})

function Auth() {
    const [user, setUser] = useState(null);
    const login = useGoogleLogin({
        // @ts-expect-error just for testing
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log(error),
    });
    const logout = () => {
        googleLogout();
        setUser(null);
    }

    if (user) {
        console.log(user);
        return (
            <div>
                <div className="p-2">Hello from Auth!</div>
                <button onClick={logout}>Logout</button>
            </div>
        );
    } else {
        return (<button onClick={() => login()}>Login with Google</button>);
    }
}