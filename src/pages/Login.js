import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

const Login = () => {
    const [inputVal, setInputVal] = useState({ username: "", password: "" })
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [loggedInSuccess, setLoggedInSuccess] = useState(false)
    const history = useHistory()

    useEffect(() => {
        let userData = JSON.parse(localStorage.getItem("user"))
        if (userData && userData.loggedIn) history.push("/users")
    }, [])

    const handleChange = (evt) => {
        const value = evt.target.value
        setInputVal({
            ...inputVal,
            [evt.target.name]: value
        })
        if (evt.target.name === "username") {
            setUsernameError("")
        } else if (evt.target.name === "password") {
            setPasswordError("")
        }
    }

    const validate = () => {
        let isError = false
        if (!inputVal.username) {
            setUsernameError("Enter username")
            isError = true
        } else {
            console.log('here')
            setUsernameError("")
        }
        if (!inputVal.password) {
            setPasswordError("Enter password")
            isError = true
        } else {
            setPasswordError("")
        }
        if (inputVal.username && inputVal.username !== "foo") {
            setUsernameError("Incorrect username")
            isError = true
        } else if (inputVal.username) {
            setUsernameError("")
        }
        if (inputVal.password && inputVal.password !== "bar") {
            setPasswordError("Incorrect password")
            isError = true
        } else if (inputVal.password) {
            setPasswordError("")
        }
        return !isError
    }

    const handleLoginClick = () => {
        if (validate()) {
            setLoggedInSuccess(true)
            let dataToStore = {
                loggedIn: true,
                userName: inputVal.username
            }
            localStorage.setItem("user", JSON.stringify(dataToStore))
            setTimeout(() => {
                history.push("/users")
            }, 2000)
        }
    }

    return (
        <div className="app app-login">
            <header className="login-container">
                <h2>Login to continue</h2>
                <div className="mb-30">
                    <input
                        type="text"
                        className="input-field"
                        onChange={handleChange}
                        name="username"
                        value={inputVal.username}
                        placeholder="Username" />
                    <span className="error">{usernameError && usernameError}</span>
                </div>
                <div className="mb-30">
                    <input
                        type="text"
                        className="input-field"
                        onChange={handleChange}
                        name="password"
                        value={inputVal.password}
                        placeholder="Password" />
                    <span className="error">{passwordError && passwordError}</span>
                </div>
                <button className="btn" onClick={() => handleLoginClick()}>Login</button>
                {loggedInSuccess && <div className="success">Successfully Logged In!</div>}
            </header>
        </div>
    )
}

export default Login