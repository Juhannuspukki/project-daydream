import React, { Component } from 'react';
import { Form, FormGroup, InputGroup,InputGroupAddon } from 'reactstrap';
import './StatBar.css';

class Settings extends Component {
  render() {
    return (
      <Form className={"Form-Centered"}>
        <FormGroup>
          <InputGroup>
            <InputGroupAddon className={"Stat-Bar-Component"} addonType="prepend">{this.props.length + " results"}</InputGroupAddon>
            <InputGroupAddon className={"Stat-Bar-Component"} addonType="prepend">{"Work avg " + this.props.work}</InputGroupAddon>
            <InputGroupAddon className={"Stat-Bar-Component"} addonType="append">{"Grade avg " + this.props.grade}</InputGroupAddon>
          </InputGroup>
        </FormGroup>
      </Form>
    );
  }
}

export default Settings;