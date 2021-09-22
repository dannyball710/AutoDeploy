import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

export default function Index() {
    let router = useRouter()
    let [token, setToken] = useState(undefined);
    let [password, setPassword] = useState("");
    useEffect(() => {
        let t = localStorage.getItem("token");
        if (!t) {
            return;
        }
        
    }, []);

    useEffect(() => {
        if (token) {
            router.push("./dashboard");
        }
    }, [token]);

    function login() {

    }

    return (
        <div>
            <div className="login">
                <h1 className="text-center">Auto Deploy</h1>
                <div className="login-password">
                    <input type="password" placeholder="Password" value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                </div>
                <div className="btn btn-full" onClick={login}>
                    Login
                </div>
            </div>
        </div>
    )
}