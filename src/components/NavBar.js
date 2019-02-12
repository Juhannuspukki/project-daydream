import React from 'react';
import { Container } from 'reactstrap';
import './NavBar.css';
import { Link } from 'react-router-dom'


const NavBar = () => (
  <Container>
    <Link className={"Info-Button"} to='/wtf'>?</Link>
    <div>
      <Link className={"Link-Button"} to='/'>
        <p className={"Pre-Header"}>The incredible</p>
        <h1 className={"Header"}>Course&#8209;o&#8209;Meter</h1>
      </Link>
    </div>
  </Container>
);

export default NavBar;
