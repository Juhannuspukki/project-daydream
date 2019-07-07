import React, { Component } from 'react';
import './App.scss';
import _ from 'underscore';
import { Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Footer from './Footer';
import ListComponent from './ListComponent';
import TextComponent from './TextComponent';
import FacultyGraphs from './FacultyGraphs';
import Course from './Course';
import initial from '../kaiku.json';

const routeChange = (history, path) => {
  history.push(path);
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      settings: {
        filter: '',
        showAll: false,
        showAbsolutes: false,
        year: '18-19',
        sort: {
          column: 'grade',
          direction: 'desc',
        },
      },
    };
    this.onSort = this.onSort.bind(this);
    this.loadYear = this.loadYear.bind(this);
    this.changeYear = this.changeYear.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { settings } = this.state;
    this.loadYear(settings.year);
  }

  onSort(sortKey) {
    const { data, settings } = this.state;

    const constant = settings.sort.direction === 'asc' ? 'desc' : 'asc';
    const direction = settings.sort.column ? constant : 'desc';
    const sortedData = _.sortBy(data, sortKey);

    if (direction === 'desc') {
      sortedData.reverse();
    }

    this.setState(prevState => ({
      data: sortedData,
      settings: {
        ...prevState.settings,
        sort: {
          column: sortKey,
          direction,
        },
      },
    }));
  }

  loadYear(year) {
    const { settings } = this.state;
    const original = initial;
    const yearlyData = [];

    _.map(original, (course) => {
      const instance = _.findWhere(course.instances, { year });
      if (typeof instance !== 'undefined') {
        instance.name = course.name;
        instance.id = course.id;
        yearlyData.push(instance);
      }
    });

    const sortedData = _.sortBy(yearlyData, settings.sort.column);

    if (settings.sort.direction === 'desc') {
      sortedData.reverse();
    }

    this.setState(prevState => ({
      ...prevState,
      data: sortedData,
    }));
  }

  handleSearch(e) {
    const searchString = e.target.value.toLowerCase();
    this.setState(prevState => ({
      settings: {
        ...prevState.settings,
        filter: searchString,
      },
    }));
  }

  handleClick(button) {
    const { settings } = this.state;
    const checked = !settings[button];
    this.setState(prevState => ({
      settings: {
        ...prevState.settings,
        [button]: checked,
      },
    }));
  }

  changeYear(toYear) {
    this.setState(prevState => ({
      settings: {
        ...prevState.settings,
        year: toYear,
      },
    }));
  }

  render() {
    const { data, settings } = this.state;
    return (
      <main>
        <Helmet>
          <title>Course-O-Meter</title>
          <meta
            name="description"
            content="Course-O-Meter gives new grades to Tampere University courses and lets you
            compare them with each other. An invaluable tool for planning your studies!"
          />
          <meta
            property="og:title"
            content="The incredible Course-O-Meter"
          />
          <meta
            property="og:url"
            content="https://course-o-meter.com"
          />
          <meta
            property="og:description"
            content="Course-O-Meter gives new grades to Tampere University courses and lets you
            compare them with each other. An invaluable tool for planning your studies!"
          />
        </Helmet>
        <Switch>
          <Route
            path="/"
            exact
            render={
            props => (
              <ListComponent
                {...props}
                settings={settings}
                courses={data}
                onSort={this.onSort}
                loadYear={this.loadYear}
                handleSearch={this.handleSearch}
                handleClick={this.handleClick}
                changeYear={this.changeYear}
                routeChange={routeChange}
              />
            )}
          />
          <Route path="/wtf" exact component={TextComponent} />
          <Route path="/faculty-o-meter" exact component={FacultyGraphs} />
          <Route path="/courses/:id" exact component={Course} />
        </Switch>
        <Footer />
      </main>
    );
  }
}

export default App;
