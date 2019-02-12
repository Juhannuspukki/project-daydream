import React, { Component } from 'react';
import './ListComponent.css';
import Settings from './Settings';
import _ from 'underscore';
import SearchForm from './SearchForm'
import StatBar from './StatBar'
import { Container } from 'reactstrap';

class ListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      original: this.props.data,
      lettered: this.props.data,
      data: this.props.data,
      filter: '',
      showAll: false,
      showAbsolutes: false,
      visibleSettings: false,
      sort: {
        column: null,
        direction: "desc"
      }
    };
    this.onSort = this.onSort.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.loadYear = this.loadYear.bind(this);
  }
  
  componentDidMount() {
    this.filterLetterless("lettered");
    this.filterLetterless("data");
  }
  
  loadYear(year) {
    const loadedYear = require("../kaiku-" + year + ".json");
    
    const filtered = loadedYear.filter(course => course.sampleSize >= 21);
    const isChecked =  this.state.showAll ? loadedYear : filtered;
    const searchString = this.state.filter;
    const sortedData = isChecked.filter(course => course.code.toLowerCase().includes(searchString) || course.name.toLowerCase().includes(searchString));
  
    this.setState({
      original: loadedYear,
      lettered: filtered,
      data: sortedData
    });
  }
  
  filterLetterless(target) {
    const sortedData = this.state.data.filter( course => course.sampleSize >= 21);
    this.setState({
      [target]: sortedData,
    });
  }
  
  handleClick(button) {
    const checked = !this.state[button];
    console.log(button, checked);
    const clicked = (checked && (button === "showAll")) ? this.state.original : this.state.data.filter(course => course.sampleSize >= 21);
    const searchString = this.state.filter;
    const sortedData = clicked.filter(course => course.code.toLowerCase().includes(searchString) || course.name.toLowerCase().includes(searchString));
  
    this.setState({
      data: sortedData,
      [button]: checked
    });
  }
  
  handleSearch(e) {
    const searchString = e.target.value.toLowerCase();
    
    const isChecked = this.state.showAll ? this.state.original : this.state.lettered;
  
    const sortedData = isChecked.filter(course => course.code.toLowerCase().includes(searchString) || course.name.toLowerCase().includes(searchString));
    this.setState({
      data: sortedData,
      filter: searchString
    });
  }
  
  onSort(event, sortKey) {
    const direction = this.state.sort.column ? (this.state.sort.direction === 'asc' ? 'desc' : 'asc') : 'desc';
  
    const sortedData = _.sortBy(this.state.data, sortKey);
  
    if (direction === 'desc') {
      sortedData.reverse();
    }
    
    this.setState({
      data: sortedData,
      sort: {
        column: sortKey,
        direction: direction
      }
    })
  }
  
  render() {
    
    let newdata = this.state.data;
    
    return (
        <Container>
          <SearchForm handleSearch={this.handleSearch}
                      loadYear={this.loadYear}/>
          <StatBar length={this.state.data.length}
                   work={(newdata.reduce((a, b) => +a + +b.work, 0)/newdata.length).toFixed(2)}
                   grade={(newdata.reduce((a, b) => +a + +b.grade, 0)/newdata.length).toFixed(2)}/>
          <Settings handleClick={this.handleClick}
                    showAll={this.state.showAll}
                    showAbsolutes={this.state.showAbsolutes}/>
          <table className="List-Component">
            <thead>
            <tr>
              <th className={"Code"} onClick={e => this.onSort(e, 'code')}>Code</th>
              <th className={"Name"} onClick={e => this.onSort(e, 'name')}>Name</th>
              <th className={"Work"} onClick={e => this.onSort(e, 'work')}>Work</th>
              <th className={"Rank"} onClick={e => this.onSort(e, 'grade')}>Rank</th>
            </tr>
            </thead>
            <tbody>
            {newdata.map(function(course, index) {
              return (
                <tr key={index} data-item={course}>
                  <td className={"Code"} data-title="Code">{course.code}</td>
                  <td className={"Name"} data-title="Name">{course.name}</td>
                  <td className={"Work"} data-title="Work">{(course.work > 0 ) && "+"}{course.work}%</td>
                  <td className={"Rank"} data-title="Rank">{this.state.showAbsolutes ? course.grade : (("letter" in course) && course.letter) }</td>
                </tr>
              );
            }, this)}
            </tbody>
          </table>
        </Container>
    );
  }
}

export default ListComponent;