import axios from "axios";
import React from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { Link, navigate } from "@reach/router";

// NOT DONE- NEEDS LOGIC IF A USER IF LOG IN TO SEE CERTAIN LINKS

const NavBar = () => {
    const logout = () => {
        axios
            .post(
                "http://localhost:8000/api/user/logout",
                {},
                {
                    withCredentials: true,
                }
            )
            .then((res) => {
                console.log(res.data);
                navigate("/user/login/");
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className="nav-bar">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Hebrew App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/user/register/">Register</Nav.Link>
                            <Nav.Link href="/user/login/">Log-In</Nav.Link>
                            <Nav.Link href="/dashboard/">Dashboard</Nav.Link>
                            <Nav.Link href="/displayhebrew/">
                                Display Hebrew
                            </Nav.Link>
                            <Nav.Link href="/lists/new/">
                                Create Study List
                            </Nav.Link>
                            <Nav.Link onClick={(e) => logout()}>
                                Log Out
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavBar;
