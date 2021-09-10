import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";
import { Card } from "react-bootstrap";

const Dashboard = (props) => {
  const [userStudyLists, setUserStudyLists] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/lists", {
        withCredentials: true, //send the cookies with the request
      })
      .then((res) => {
        console.log(res.data);
        setUserStudyLists(res.data.lists);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteOneList = (listId) => {
    axios
      .delete("http://localhost:8000/api/lists/delete/" + listId)
      .then((res) => {
        console.log("successfully deleted " + listId);
        // navigate("/dashboard/");

        let filteredLists = userStudyLists.filter((oneList) => {
          return oneList._id !== listId;
        });
        setUserStudyLists(filteredLists);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="row">
      <h2>Welcome {}</h2>
      {userStudyLists.map((lists, index) => (
        <Card key={index} style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{lists.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {lists.title}
            </Card.Subtitle>
            <Card.Text>{lists.description}</Card.Text>
            <Card.Link href={"/lists/" + lists._id}>View Your List</Card.Link>
            <Card.Link href={"/lists/" + lists._id}>Edit Your List</Card.Link>
            <Card.Link
              onClick={(e) => {
                deleteOneList(lists._id);
              }}
            >
              Delete Your List
            </Card.Link>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Dashboard;
