import React, { useState } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";
import { Form, Button } from "react-bootstrap";

const Login = (props) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { setUser_Id } = props;

    const logInSubmitButton = (e) => {
        e.preventDefault();

        axios
            .post(
                "http://localhost:8000/api/user/login",
                { userName, password },
                {
                    withCredentials: true,
                }
            )
            .then((res) => {
                console.log(res.data.userLogged);
                setUser_Id(res.data.userLogged);
                navigate("/users");
            })
            .catch((err) => {
                console.log(err);
                setErrorMessage(err.response.data.msg);
            });
    };
    return (
        <div>
            <h5>Log In!</h5>
            <Button
                onClick={() => navigate("/user/register/")}
                variant="link"
                type="submit">
                Back Register
            </Button>

            <Form onSubmit={logInSubmitButton} className="loginForm">
                <Form.Group className="mb-3" controlId="petName">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="userName"
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="User Name"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="petType">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </Form.Group>

                <Form.Control
                    type="submit"
                    value="Log In"
                    className="btn-sm btn-dark"
                />
                <span className="error-message">
                    {errorMessage ? errorMessage : ""}{" "}
                </span>
            </Form>
        </div>
    );
};

export default Login;
