import React, { Component } from 'react';
import './ListComponent.css';
import _ from 'underscore';
import { Container } from 'reactstrap';
import SearchForm from './SearchForm';
import Settings from './Settings';
import initial from '../kaiku.json';
import NavBar from './NavBar'

class ListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      settings: this.props.settings
    };
    this.onSort = this.onSort.bind(this);
    this.loadYear = this.loadYear.bind(this);
    this.changeYear = this.changeYear.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.routeChange = this.routeChange.bind(this);
  }

  componentDidMount() {
    this.loadYear(this.state.settings.year);
  }

  loadYear(year) {
    const original = initial;
    let yearlyData = [];

    _.map(original, course => {
      let instance = _.findWhere(course["instances"], {year: year});
      if (typeof instance !== "undefined") {
        instance["name"] = course["name"];
        instance["id"] = course["id"];
        yearlyData.push(instance)
      }
    });

    const sortedData = _.sortBy(yearlyData, this.state.settings.sort.column);

    if (this.state.settings.sort.direction === 'desc') {
      sortedData.reverse();
    }

    this.setState(prevState => ({
      data: sortedData
    }))
  }

  onSort(sortKey) {
    const direction = this.state.settings.sort.column ? (this.state.settings.sort.direction === 'asc' ? 'desc' : 'asc') : 'desc';
    const sortedData = _.sortBy(this.state.data, sortKey);

    if (direction === 'desc') {
      sortedData.reverse();
    }

    this.setState(prevState => ({
      data: sortedData,
      settings: {
        ...prevState.settings,
        sort: {
          column: sortKey,
          direction: direction
        }
      }
    }))
  }

  handleSearch(e) {
    const searchString = e.target.value.toLowerCase();
    this.setState(prevState => ({
      settings: {
        ...prevState.settings,
        filter: searchString
      }
    }))
  }

  handleClick(button) {
    const checked = !this.state.settings[button];
    this.setState(prevState => ({
      settings: {
        ...prevState.settings,
        [button]: checked
      }
    }))
  }

  changeYear(toYear) {
    this.setState(prevState => ({
      settings: {
        ...prevState.settings,
        year: toYear
      }
    }))
  }

  routeChange(path) {
    this.props.history.push(path);
  };

  render() {

    const courses = this.state.data;
    const showAll = this.state.settings.showAll;
    const searchString = this.state.settings.filter;
    const column = this.state.settings.sort.column;
    const direction = this.state.settings.sort.direction;
    let counter = 0;

    return (
        <Container>
          <NavBar pretitle="The incredible" title={"Course\u2011O\u2011Meter"}/>
          <SearchForm handleSearch={this.handleSearch}
                      loadYear={this.loadYear}
                      currentYear={this.state.settings.year}
                      changeYear={this.changeYear}
                      searchString={searchString}
          />
          <Settings handleClick={this.handleClick}
                    showAll={showAll}
                    showAbsolutes={this.state.settings.showAbsolutes}
          />
          <table className="List-Component">
            <thead>
            <tr>
              <th className={"Code"} onClick={() => this.onSort('code')}>Code&nbsp;{column === "code" && (direction === "asc" ? "↑" : "↓")}</th>
              <th className={"Name"} onClick={() => this.onSort('name')}>Name&nbsp;{column === "name" && (direction === "asc" ? "↑" : "↓")}</th>
              <th className={"Work"} onClick={() => this.onSort('work')}>Work&nbsp;{column === "work" && (direction === "asc" ? "↑" : "↓")}</th>
              <th className={"Rank"} onClick={() => this.onSort('grade')}>Rank&nbsp;{column === "grade" && (direction === "asc" ? "↑" : "↓")}</th>
            </tr>
            </thead>
            <tbody>
            {_.map(courses, course => {
              if (((showAll === true) || (showAll === false && "letter" in course)) && (course.code.toLowerCase().includes(searchString) || course.name.toLowerCase().includes(searchString))) {
                counter += 1;
                return (
                  <tr key={course.code}
                      data-item={course}
                      onClick={() => {this.props.saveState(this.state.settings); this.routeChange(`/course/${course.id}`)}}>
                    <td className={"Code"} data-title="Code">{course.code}</td>
                    <td className={"Name"} data-title="Name">{course.name}</td>
                    <td className={"Work"} data-title="Work">{(course.work > 0 ) && "+"}{course.work}%</td>
                    <td className={"Rank"}
                        data-title="Rank">{this.state.settings.showAbsolutes ? course.grade : (("letter" in course) && course.letter)}</td>
                  </tr>
                );
              }})
            }
            </tbody>
          </table>
          <p className="Counter">{counter} results<br/>Last database update: 7.7.2019</p>
        </Container>
    );
  }
}

export default ListComponent;
