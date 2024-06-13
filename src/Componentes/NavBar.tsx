import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";

const NavBar = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" sticky="top" bg="secondary">
        <Container>
          <Navbar.Brand>
            <Image src="/BRIDGE-IN.png" width={200}></Image>
          </Navbar.Brand>
          <Navbar.Toggle
            className="ms-auto"
            aria-controls="responsive-navbar-nav"
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/how-it-works">How it works?</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
