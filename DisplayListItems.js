import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";
import { Card, Dropdown, ListGroup } from "react-bootstrap";

const DisplayListItems = (props) => {
  // const [word_id, setWord_id] = useState("");

  const [oneSingleStudyList, setOneSingleStudyList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/lists/" + props.id)
      .then((res) => {
        console.log(res.data);
        setOneSingleStudyList(res.data.list);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.id]);

  return (
    <div className="row">
      <h3>{oneSingleStudyList.title}</h3>
      {oneSingleStudyList.word_ids !== undefined &&
        oneSingleStudyList.word_ids.map((letter, index) => (
          <>
            <Card
              key={index}
              className="text-center"
              style={{ width: "18rem" }}
            >
              <Card.Header>{letter.letterName}</Card.Header>
              <Card.Body>
                <Card.Img
                  style={{ width: "110px" }}
                  alt={letter.letterName}
                  src={letter.letterImage}
                />
                <Card.Title>{letter.letterName}</Card.Title>
                <Card.Text>
                  <p>{letter.description}</p>
                  <ListGroup variant="flush">
                    <ListGroup.Item>{letter.meaning}</ListGroup.Item>
                    <ListGroup.Item>{letter.pronounced}</ListGroup.Item>
                  </ListGroup>
                </Card.Text>
              </Card.Body>
              <Card.Body></Card.Body>
              <Card.Footer className="text-muted">
                {letter.pronouncation}
              </Card.Footer>
            </Card>
          </>
        ))}
    </div>
  );
};

export default DisplayListItems;
