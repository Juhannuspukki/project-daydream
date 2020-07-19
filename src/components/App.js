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
import NavBar from "./NavBar";
import WrongBrowser from "./WrongBrowser";

const routeChange = (history, path) => {
  history.push(path);
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initial: [],
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
      isLoading: true,
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
    if (cookies.get("theme") === "dark") {
      document.body.classList.remove("Light");
    }

    const f = async () => await import("../kaiku.json");

    f().then((response) => {
      this.setState({ initial: response.default }, () => {
        this.loadYear(settings.year);
      });
    });
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
    const { settings, initial } = this.state;
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
      isLoading: false,
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
      return null;
    });

    // Internet Explorer 11
    const isIE = /Trident|MSIE/.test(window.navigator.userAgent);

    // Edge 20+
    const isEdge = !isIE && !!window.StyleMedia;

    const loading = (
      <div className={"Loading"}>
        <svg
          className={"Rotator"}
          fill="#171f28"
          width="100pt"
          height="100pt"
          version="1.1"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path d="m37.301 61.398v3.8008h-1.5c-1.6992 0-3 1.3984-3 3 0 1.6016 1.3984 3 3 3h28.5c1.6992 0 3-1.3984 3-3 0-1.6016-1.3984-3-3-3h-1.5v-3.8008c0-3.1992-1.3984-6.1992-3.8984-8.3008l-4-3.3008 4-3.3008c2.5-2 3.8984-5 3.8984-8.3008v-3.8008h1.5c1.6992 0 3-1.3984 3-3 0-1.6016-1.3984-3-3-3l-28.5 0.003907c-1.6992 0-3 1.3984-3 3 0 1.6016 1.3984 3 3 3h1.5v3.8008c0 3.1992 1.3984 6.1992 3.8984 8.3008l4 3.3008-4 3.3008c-2.5 2.0977-3.8984 5.0977-3.8984 8.2969zm6-23v-3.8008h13.301v3.8008c0 1.3984-0.60156 2.6992-1.6992 3.6016l-4.9023 4-5-4.1016c-1.1016-0.79688-1.6992-2.0977-1.6992-3.5zm1.6992 19.5 5-4.1016 5 4.1016c1.1016 0.89844 1.6992 2.1992 1.6992 3.6016v3.8008h-13.398v-3.8008c0-1.5 0.59766-2.8008 1.6992-3.6016z" />
            <path d="m82.699 71.102c-4.8984 6.7969-11.898 11.898-19.598 14.297-7.6992 2.5-16.102 2.1992-23.5-0.30078-7.3984-2.6016-13.898-7.5-18.102-13.898-4.3984-6.3008-6.3008-13.898-6-21.301v-0.10156-0.5c-0.19922-3.6016-3.1992-6.3984-6.8008-6.1992-3.6016 0.19922-6.3984 3.1992-6.1992 6.8008 0.5 10.102 4 20.102 10.398 27.703 6.1992 7.8008 14.898 13.301 24.301 15.699 9.3984 2.3008 19.398 1.6992 28.102-2 8.8008-3.6016 16.102-10.102 20.801-18 0.5-0.89844 0.30078-2.1016-0.60156-2.6992-0.89844-0.60156-2.1992-0.40234-2.8008 0.5z" />
            <path d="m87.102 22.199c-6.2031-7.6992-14.902-13.199-24.301-15.598-9.3984-2.3008-19.301-1.6992-28 2-8.6992 3.6016-16 10.102-20.602 17.898-0.39844 0.80078-0.19922 1.8008 0.5 2.3008 0.80078 0.5 1.8008 0.39844 2.3984-0.39844 4.8984-6.8008 12-11.898 19.801-14.301 7.8008-2.5 16.199-2.1992 23.699 0.39844 7.3984 2.6992 13.898 7.6016 18.102 14.102 4.3008 6.3008 6.1992 14 5.8984 21.398v0.60156c0.19922 3.6016 3.1992 6.3984 6.8008 6.1992 3.6016-0.19922 6.3984-3.1992 6.1992-6.8008-0.59766-10.199-4.1992-20.102-10.496-27.801z" />
          </g>
        </svg>
        <h2>Loading courses...</h2>
      </div>
    );

    if (isEdge || isIE) {
      return <WrongBrowser />;
    } else {
      return (
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
                render={(props) =>
                  this.state.isLoading ? (
                    loading
                  ) : (
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
                  )
                }
              />
              <Route path="/wtf" exact component={TextComponent} />
              <Route path="/faculty-o-meter" exact component={FacultyGraphs} />
              <Route
                path="/courses/:id"
                exact
                render={(props) =>
                  this.state.isLoading ? (
                    loading
                  ) : (
                    <Course
                      {...props}
                      courseList={courses}
                      kaiku={this.state.initial}
                    />
                  )
                }
              />
            </Switch>
          </main>
          <Footer />
        </>
      );
    }
  }
}

export default withCookies(App);
