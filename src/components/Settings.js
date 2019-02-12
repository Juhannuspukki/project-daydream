import React, { Component } from 'react';
import { ButtonGroup, Button } from 'reactstrap';
import './Settings.css';
import { Link } from 'react-router-dom'

class Settings extends Component {
  render() {
    return (
      <ButtonGroup className={"Control-Buttons"}>
        <Button className={"Glowless"} onClick={() => this.props.handleClick("showAll")}> Show {this.props.showAll ? "graded" : "all"} courses</Button>
        <Button className={"Glowless"} onClick={() => this.props.handleClick("showAbsolutes")}>Show {this.props.showAbsolutes ? "relative" : "absolute"} grades</Button>
        <Button className={"Glowless Link-Button-Container"}><Link className={"Link-Button"} to='/wtf'>Wtf?</Link></Button>
      </ButtonGroup>
    );
  }
}

export default Settings;