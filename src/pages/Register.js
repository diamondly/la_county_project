import React from 'react'
import { useState } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'

export default function Register() {
    const [inputs, setInputs] = useState({});
    const [status, setStatus] = useState(null);
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };
    const handleSubmit = (event) => {
        event.preventDefault(); //will prevent refreshing the page
        sendUser(event.target[0].value, event.target[1].value, event.target[2].value);
    };

    function sendUser(username, email, password) {
      axios.post('http://localhost:4000/users', {username:username, email:email, password:password}) //post request to server
      .then(res => { //receive response from server
          alert("Account created!");
          setStatus(res.data.status); //convert it to string
          console.log(res);
      })
      .catch((error) => { 
          console.log(error) 
      });
  }

    return (
        <>
          <body>
            <div className="container">
              <form
                className="form form__input-group"
                id="createAccount"
                onSubmit={handleSubmit}
              >
                <h1 className="form__title"> Create Account </h1>
                <div className="form__input-group">
                  <input
                    type="text"
                    className="form__input"
                    name="name"
                    autofocus
                    placeholder="Username"
                    required
                    value={inputs.name || ""}
                    onChange={handleChange}
                  ></input>
                </div>
                <br/>
                <div className="form__input-group">
                  <input
                    type="text"
                    className="form__input"
                    name="email"
                    autofocus
                    placeholder="Email Address"
                    required
                    value={inputs.email || ""}
                    onChange={handleChange}
                  ></input>
                </div>
                <br/>
                <div className="form__input-group">
                  <input
                    type="password"
                    className="form__input"
                    name="password"
                    autofocus
                    placeholder="Password"
                    required
                    value={inputs.password || ""}
                    onChange={handleChange}
                  ></input>
                </div>
                <br/>
                <div className="form__input-group">
                  <input
                    type="password"
                    name="confirmPassword"
                    autofocus
                    placeholder="Confirm Password"
                    required
                    value={inputs.confirmPassword || ""}
                    onChange={handleChange}
                  ></input>
                </div>
                <br/>
                <button className="form__button" type="submit">
                  {" "}
                  Submit
                </button>
                <p class="form__text">
                  <Link class="form__link" to="/login" id="linkCreateAccount">
                    {" "}
                    Already have an account? Sign in
                  </Link>
                </p>
              </form>
            </div>
          </body>
        </>
      );
}