import React, { Component } from 'react';
import { Container } from 'reactstrap';
import './NavBar.css';


class NavBar extends Component {
  render() {
    return (
      <Container>
        <h1 className={"Header"}>TUT Course&#8209;o&#8209;meter</h1>
      </Container>
    );
  }
}

export default NavBar;
