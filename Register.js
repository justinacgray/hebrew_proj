import React, { useState } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";
import { Form, Button } from "react-bootstrap";

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});

    const registerSubmitButton = (e) => {
        e.preventDefault();

        const newUser = {
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
        };

        axios
            .post("http://localhost:8000/api/user/register", newUser, {
                withCredentials: true,
            })

            .then((res) => {
                console.log(res);

                // setUserName("");
                // setEmail("");
                // setPassword("");
                // setConfirmPassword("");

                if (res.data.error) {
                    setErrors(res.data.error.errors);
                } else {
                    // on success
                    navigate("/dashboard/");
                }
            })
            .catch((err) => {
                console.log(err);

                setErrors(err.response.data.errors);
            });
    };
    return (
        <div>
            <Form onSubmit={registerSubmitButton} className="registerForm">
                <Form.Group className="mb-3">
                    <Form.Label>First Name:</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstName"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                    />
                    {errors.firstName ? (
                        <span className="error-message">
                            {errors.firstName.message}
                        </span>
                    ) : (
                        ""
                    )}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Last Name:</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastName"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                    />
                    {errors.lastName ? (
                        <span className="error-message">
                            {errors.lastName.message}
                        </span>
                    ) : (
                        ""
                    )}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    {errors.email ? (
                        <span className="error-message">
                            {errors.email.message}
                        </span>
                    ) : (
                        ""
                    )}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type="text"
                        name="userName"
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName}
                    />
                    {errors.username ? (
                        <span className="error-message">
                            {errors.userName.message}
                        </span>
                    ) : (
                        ""
                    )}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        name="email"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    {errors.password ? (
                        <span className="error-message">
                            {errors.password.message}
                        </span>
                    ) : (
                        ""
                    )}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control
                        type="password"
                        name="confirmPassword"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                    />
                    {errors.confirmPassword ? (
                        <span className="error-message">
                            {errors.confirmPassword.message}
                        </span>
                    ) : (
                        ""
                    )}
                </Form.Group>
                <Form.Control
                    type="submit"
                    value="Register"
                    className="btn-sm btn-dark"
                />
            </Form>
            <Button
                onClick={() => navigate("/user/login/")}
                variant="link"
                type="submit">
                Registered? Click Here to Log in
            </Button>
        </div>
    );
};

export default Register;
