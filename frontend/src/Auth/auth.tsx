import {useEffect, useState} from "react";
import {googleLogout, TokenResponse, useGoogleLogin} from "@react-oauth/google";
import axios from "redaxios";
import Profile from "./profile.tsx";

export function Auth() {
    const [user, setUser] = useState<TokenResponse>();
    const [profile, setProfile] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [user]
    );

    const logOut = () => {
        googleLogout();
        setProfile([]);
    };

    return (
        <div>
            <Profile profileDetails={profile} login={login} logout={logOut} />
        </div>
    );
}