import React, { Component } from 'react';
import { ButtonGroup, Button } from 'reactstrap';
import './Settings.css';

class Settings extends Component {
  render() {
    return (
      <ButtonGroup className={"Control-Buttons"}>
        <Button className={"Glowless"} onClick={() => this.props.handleClick("showAll")}> Show {this.props.showAll ? "graded" : "all"} courses</Button>
        <Button className={"Glowless"} onClick={() => this.props.handleClick("showAbsolutes")}>Show {this.props.showAbsolutes ? "relative" : "absolute"} grades</Button>
      </ButtonGroup>
    );
  }
}

export default Settings;