import axios from 'axios';
import React, { useRef } from 'react';
import "./register.css";
import { useHistory } from "react-router";


export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const prev = useHistory();

    const handleClick = async (e) => {
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value){
            password.current.setCustomValidity("Password don't match!");
        }else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,


            }
            try{
                await axios.post("/auth/register", user);
                prev.push("/login")

            }catch(e){
                console.log(e);
            }
        }
    }



    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Mars Feed</h3>
                    <span className="loginDesc">Connect to Eco</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder="UserName" required ref={username} className="loginInput" />
                        <input placeholder="Email" required ref={email} type="email" className="loginInput" />
                        <input placeholder="Password" required ref={password} minLength="6" type="password" className="loginInput" />
                        <input placeholder="Password Again" required ref={passwordAgain} minLength="6" type="password" className="loginInput" />
                        <button className="loginButton" type="submit">Sign up</button>
                        <button className="loginRegister">Log in to your account</button>
                    </form>
                </div>
            </div>
            
        </div>
    )
}
