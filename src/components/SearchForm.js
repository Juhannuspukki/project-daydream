import React, { Component } from 'react';
import { Form, FormGroup, InputGroup, InputGroupButtonDropdown, DropdownItem, DropdownToggle, DropdownMenu, Input } from 'reactstrap';

class Settings extends Component {
  constructor(props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);
    this.changeYear = this.changeYear.bind(this);
    
    this.state = {
      dropdownOpen: false,
      years: ["17-18", "16-17", "15-16", "14-15"],
      year: "17-18"
    };
  }
  
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  
  changeYear(toYear) {
    this.setState({
      year: toYear
    });
  }
  
  render() {
    let newdata = this.state.years;
  
    return (
      <Form>
        <FormGroup>
          <InputGroup>
            <Input className={"Search-Bar"} type="text" placeholder="Search..." onChange={this.props.handleSearch}/>
            <InputGroupButtonDropdown addonType="append" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle caret>
                {this.state.year}
              </DropdownToggle>
              <DropdownMenu>
                {newdata.map(function(year, index) {
                  return (
                    <DropdownItem key={index} onClick={() => {this.props.loadYear(year); this.changeYear(year);}}>{year}</DropdownItem>
                  );
                }, this)}
              </DropdownMenu>
            </InputGroupButtonDropdown>
          </InputGroup>
        </FormGroup>
      </Form>
    );
  }
}

export default Settings;