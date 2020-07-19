import React, { Component } from "react";
import "../stylesheets/styles.scss";
import { Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import { withCookies } from "react-cookie";
import Footer from "./Footer";
import ListComponent from "./ListComponent";
import TextComponent from "./TextComponent";
import FacultyGraphs from "./FacultyGraphs";
import Course from "./Course";
import initial from "../kaiku.json";
import NavBar from "./NavBar";
import WrongBrowser from "./WrongBrowser";

const routeChange = (history, path) => {
  history.push(path);
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      settings: {
        filter: "",
        showAll: false,
        showAbsolutes: false,
        year: "19-20",
        sort: {
          column: "grade",
          direction: "desc",
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
    const { cookies } = this.props;
    const { settings } = this.state;
    this.loadYear(settings.year);
    if (cookies.get("theme") === "dark") {
      document.body.classList.remove("Light");
    }
  }

  onSort(sortKey) {
    const { data, settings } = this.state;

    const constant = settings.sort.direction === "asc" ? "desc" : "asc";
    const direction = settings.sort.column ? constant : "desc";
    const sortedData = [...data];

    if (settings.sort.column === "grade") {
      sortedData.sort((a, b) => a.grade - b.grade);
    } else {
      sortedData.sort();
    }

    if (direction === "desc") {
      sortedData.reverse();
    }

    this.setState((prevState) => ({
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
    const yearlyData = [];

    initial.forEach((course, index1) => {
      course.instances.forEach((instance, index2) => {
        if (instance.year === year) {
          const courseBlock = {
            link: course.id,
            id: `${course.id}-${index1}-${index2}`,
            name: course.name,
            code: instance.code,
            grade: instance.grade,
            work: instance.work,
            sampleSize: instance.sampleSize,
            period: instance.period,
          };

          if (typeof instance.letter !== "undefined") {
            courseBlock.letter = instance.letter;
          }

          yearlyData.push(courseBlock);
        }
      });
    });

    if (settings.sort.column === "grade") {
      yearlyData.sort((a, b) => a.grade - b.grade);
    } else {
      yearlyData.sort();
    }

    if (settings.sort.direction === "desc") {
      yearlyData.reverse();
    }

    this.setState((prevState) => ({
      ...prevState,
      data: yearlyData,
    }));
  }

  handleSearch(e) {
    const searchString = e.target.value.toLowerCase();
    this.setState((prevState) => ({
      settings: {
        ...prevState.settings,
        filter: searchString,
      },
    }));
  }

  handleClick(button) {
    const { settings } = this.state;
    const checked = !settings[button];
    this.setState((prevState) => ({
      settings: {
        ...prevState.settings,
        [button]: checked,
      },
    }));
  }

  changeYear(toYear) {
    this.setState((prevState) => ({
      settings: {
        ...prevState.settings,
        year: toYear,
      },
    }));
  }

  render() {
    const { data, settings } = this.state;

    const courses = data.filter((course) => {
      if (
        (settings.showAll === true ||
          (settings.showAll === false && "letter" in course)) &&
        (course.code.toLowerCase().includes(settings.filter) ||
          course.name.toLowerCase().includes(settings.filter))
      ) {
        return course;
      }
    });

    // Internet Explorer 11
    const isIE = /Trident|MSIE/.test(window.navigator.userAgent);

    // Edge 20+
    const isEdge = !isIE && !!window.StyleMedia;

    return isEdge || isIE ? (
      <WrongBrowser />
    ) : (
      <>
        <Helmet>
          <title>Course-O-Meter</title>
          <meta
            name="description"
            content="Course-O-Meter gives new grades to Tampere University courses and lets you
              compare them with each other. An invaluable tool for planning your studies!"
          />
          <meta property="og:title" content="The incredible Course-O-Meter" />
          <meta property="og:url" content="https://course-o-meter.com" />
          <meta
            property="og:description"
            content="Course-O-Meter gives new grades to Tampere University courses and lets you
              compare them with each other. An invaluable tool for planning your studies!"
          />
        </Helmet>
        <NavBar />
        <main>
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => (
                <ListComponent
                  {...props}
                  settings={settings}
                  courses={courses}
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
            <Route
              path="/courses/:id"
              exact
              render={(props) => <Course {...props} courseList={courses} />}
            />
          </Switch>
        </main>
        <Footer />
      </>
    );
  }
}

export default withCookies(App);
