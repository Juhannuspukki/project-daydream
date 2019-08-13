import React, { Component } from 'react';
import { Form, FormGroup, InputGroup, InputGroupButtonDropdown, DropdownItem, DropdownToggle, DropdownMenu, Input } from 'reactstrap';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      years: ['18-19', '17-18', '16-17', '15-16', '14-15'],
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const { dropdownOpen } = this.state;
    this.setState({
      dropdownOpen: !dropdownOpen,
    });
  }

  render() {
    const {
      loadYear,
      currentYear,
      changeYear,
      handleSearch,
      searchString,
    } = this.props;

    const { dropdownOpen, years } = this.state;

    return (
      <Form onSubmit={(e) => { e.preventDefault(); }}>
        <FormGroup>
          <InputGroup>
            <Input
              className="Search-Bar"
              type="text"
              placeholder="Search..."
              value={searchString}
              onChange={handleSearch}
            />
            <InputGroupButtonDropdown className="YearButton" addonType="append" isOpen={dropdownOpen} toggle={this.toggle}>
              <DropdownToggle caret>
                {currentYear}
              </DropdownToggle>
              <DropdownMenu>
                {years.map(year => (
                  <DropdownItem
                    key={year}
                    onClick={() => { loadYear(year); changeYear(year); }}
                  >
                    {year}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </InputGroupButtonDropdown>
          </InputGroup>
        </FormGroup>
      </Form>
    );
  }
}

export default Settings;
