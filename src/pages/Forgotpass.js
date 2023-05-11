import React from 'react'
import { Link } from "react-router-dom"

export default function Forgotpass() {
    return ( // Needs form submission
        <>
            <body>
            <form>
                <h1>Forgot your Password?</h1>
                <div class="container">
                    <p>Please enter your email below to receive a link for resetting your password.</p>
                    <label for="email"><b>Email: </b></label>
                    <input type="text" placeholder="Enter your email" name="email" required/>
                    <br/> <br/>
                    <button type="submit">Send link</button>
                    <br/> <br/>
                    <Link to="/login">Back to Login</Link>
                </div>
            </form>
            </body>
        </>
    )
}