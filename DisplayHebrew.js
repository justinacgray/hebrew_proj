import React, { useState, useEffect } from "react";
import { Link, navigate } from "@reach/router";
import axios from "axios";
import { Card, Dropdown, ListGroup } from "react-bootstrap";

const DisplayHebrew = (props) => {
    //usestate for Hebrew Alph-bet and useEffect- get all words
    //upate list to include letter-word
    //onSelect event put in id on the list- axios PUT list id and letter id- route on backend to update list- take
    //
    const [hebrewLetters, setHebrewLetters] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/words", {
                withCredentials: true, //send the cookies with the request
            })
            .then((res) => {
                console.log(res.data);
                setHebrewLetters(res.data.words);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const [userCreatedLists, setUserCreatedLists] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/lists", {
                withCredentials: true, //send the cookies with the request
            })
            .then((res) => {
                console.log(res.data);
                setUserCreatedLists(res.data.lists);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [props.id]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [user_id, setUser_id] = useState("");
    const [word_ids, setWord_ids] = useState("");
    const [errors, setErrors] = useState({});

    const selectListEvent = (e) => {
        // e.preventDefault();
        const [listsId, letterId] = e.split(" ");
        console.log(listsId);
        console.log(letterId);

        // call axios to post the object to my api
        axios
            .put("http://localhost:8000/api/lists/update/" + listsId, {
                letterId: letterId,
            })
            //on success, redirect to  dash
            .then((res) => {
                console.log(res.data);
                //if we have validation errors NOT errors with server
                if (res.data.error) {
                    setErrors(res.data.error.errors);
                } else {
                    // on success
                    navigate("/dashboard/");
                }
            })
            //on failure, save errors in state so the user can correct the incorrect inputs
            .catch((err) => {
                console.log(err);
            });
    };

    const [addWordToList, setAddWordToList] = useState("");

    // updating list
    //add word

    // const handleAddWord = (e) => {
    //   e.preventDefault();
    //   const addWords = addWordToList.concat({ name });
    //   setAddWordToList(addWords);
    // };

    return (
        <div className="container">
            <h3 id=""> Let's Learn the Hebrew Alphabet</h3>
            <div className="row">
                {hebrewLetters.map((letter, index) => (
                    <Card
                        key={index}
                        className="card"
                        style={{ width: "18rem" }}>
                        <Card.Body className="card-body">
                            <Card.Img
                                style={{ width: "110px" }}
                                alt={letter.letterName}
                                src={letter.letterImage}
                            />
                            <Card.Title className="card-title">
                                {letter.letterName}
                            </Card.Title>
                            <Card.Text className="card-text">
                                <p> Description: {letter.description}</p>
                                Meaning: {letter.meaning}
                                Pronounication: {letter.pronounced}
                            </Card.Text>
                            <Dropdown onSelect={selectListEvent}>
                                <Dropdown.Toggle
                                    variant="success"
                                    id="dropdown-basic">
                                    Save to List
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {/* map over created lists */}
                                    {userCreatedLists.map((lists, index) => (
                                        <Dropdown.Item
                                            key={index}
                                            eventKey={`${lists._id} ${letter._id}`}>
                                            {lists.title}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Card.Body>
                        <Card.Body></Card.Body>
                        <Card.Footer className="text-muted">
                            {letter.pronouncation}
                        </Card.Footer>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default DisplayHebrew;
