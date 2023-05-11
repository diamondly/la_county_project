import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom"

export default function Login() {
    const [inputs, setInputs] = useState({});
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };
    const handleSubmit = (event) => {
        event.preventDefault(); //will prevent refreshing the page
        alert(
        "A form was submitted: " +
            "USERNAME: " +
            event.target[0].value +
            " PASSWORD: " +
            event.target[1].value
        );
    };
    return (
        <>
        <body>
            <h1>Login</h1>
            <div className="login-form">
                <form onSubmit={handleSubmit}>
                    <label for="user"><b>Username: </b></label>
                    <input type="text" placeholder="Enter Username" name="user" required 
                        value={inputs.user || ""} onChange={handleChange}/>
                    <br/> <br/>
                    <label for="pass"><b>Password: </b></label>
                    <input type="password" placeholder="Enter Password" name="pass" required
                        value={inputs.pass || ""} onChange={handleChange}/>
                    <br/> <br/>
                    <button type="submit">LOGIN</button>
                    <br/> <br/>
                    Don't have an account? <Link to="/register">Register now!</Link>
                    | <Link to="/forgotPass">Forgot password?</Link>
                </form>
            </div>
        </body>
        </>
    )
}