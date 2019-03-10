import React, { Component } from 'react';
import { Container } from 'reactstrap';
import './NavBar.css';
import { Link } from 'react-router-dom'

class NavBar extends Component {
  render() {
    return (
      <Container>
        <Link className={"Info-Button"} to='/wtf'>?</Link>
        <div>
          <Link className={"Link-Button"} to='/'>
            <p className={"Pre-Header"}>{this.props.pretitle}</p>
            <h1 className={"Header"}>{this.props.title}</h1>
          </Link>
        </div>
      </Container>
    )
  }
}

export default NavBar;
