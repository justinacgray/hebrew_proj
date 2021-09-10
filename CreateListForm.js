import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";
import { Form, Button } from "react-bootstrap";

//NOT DONE- FIX CREATE OPTION NEED SOMETHING AFTER newList variable line 17

const CreateListForm = (props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [user_id, setuser_Id] = useState({});
    const [word_ids, setWord_ids] = useState([]);

    const [errors, setErrors] = useState({});

    const listSubmitButton = (e) => {
        e.preventDefault();

        const newList = {
            title: title,
            description: description,
            user_id: user_id,
            word_ids: word_ids,
        };
        console.log(newList);
        axios
            .post("http://localhost:8000/api/lists/new", newList, {
                withCredentials: true, //send the cookies with the request
            })
            .then((res) => {
                console.log(res.data);
                if (res.data.errors) {
                    setErrors(res.data.errors);
                } else {
                    // on success, redirect (navigate) to dashboard
                    navigate("/dashboard/");
                }
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.message);
            });
    };

    return (
        <div>
            <Form onSubmit={listSubmitButton} className="createForm">
                <Form.Group />
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                />

                <Form.Group />
                <Form.Label>Description</Form.Label>
                <Form.Control
                    type="textarea"
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Button
                    variant="link"
                    type="submit"
                    className="btn-sm btn-dark">
                    Create List
                </Button>
            </Form>
        </div>
    );
};

export default CreateListForm;
