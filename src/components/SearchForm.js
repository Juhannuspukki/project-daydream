import React, { Component } from 'react';
import { Form, FormGroup, InputGroup, InputGroupButtonDropdown, DropdownItem, DropdownToggle, DropdownMenu, Input } from 'reactstrap';
import './SearchForm.css';

class Settings extends Component {
  constructor(props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);
    
    this.state = {
      dropdownOpen: false,
      years: ["18-19", "17-18", "16-17", "15-16", "14-15"],
    };
  }
  
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  
  render() {
    let newdata = this.state.years;
  
    return (
      <Form>
        <FormGroup>
          <InputGroup>
            <Input className={"Search-Bar"} type="text" placeholder="Search..." value={this.props.searchString} onChange={this.props.handleSearch} />
            <InputGroupButtonDropdown className="YearButton" addonType="append" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle caret>
                {this.props.currentYear}
              </DropdownToggle>
              <DropdownMenu>
                {newdata.map(function(year, index) {
                  return (
                    <DropdownItem key={index} onClick={() => {this.props.loadYear(year); this.props.changeYear(year);}}>{year}</DropdownItem>
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