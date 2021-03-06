import React from "react";
import { Container } from "reactstrap";
import SearchForm from "./SearchForm";
import Settings from "./Settings";

const ListComponent = (props) => {
  const {
    history,
    onSort,
    loadYear,
    handleSearch,
    handleClick,
    changeYear,
    routeChange,
    courses,
    settings: {
      showAll,
      filter,
      year,
      showAbsolutes,
      sort: { column, direction },
    },
  } = props;

  return (
    <Container>
      <SearchForm
        handleSearch={handleSearch}
        loadYear={loadYear}
        currentYear={year}
        changeYear={changeYear}
        searchString={filter}
      />
      <Settings
        handleClick={handleClick}
        showAll={showAll}
        showAbsolutes={showAbsolutes}
      />
      {filter && !showAll && (
        <p className="Info-Text">
          <i>
            Currently ONLY showing courses with more than 20 participants. If
            you did not find what you were searching for, click "Show all
            courses" above.
          </i>
        </p>
      )}
      <table className="List-Component">
        <thead>
          <tr>
            <th className="Code" onClick={() => onSort("code")}>
              Code&nbsp;
              {column === "code" && (direction === "desc" ? "↑" : "↓")}
            </th>
            <th className="Name" onClick={() => onSort("name")}>
              Name&nbsp;
              {column === "name" && (direction === "desc" ? "↑" : "↓")}
            </th>
            <th className="Period">Per.</th>
            <th className="Work" onClick={() => onSort("work")}>
              Work&nbsp;
              {column === "work" && (direction === "desc" ? "↑" : "↓")}
            </th>
            <th className="Rank" onClick={() => onSort("grade")}>
              #&nbsp;
              {column === "grade" && (direction === "desc" ? "↑" : "↓")}
            </th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr
              key={course.id}
              data-item={course}
              onClick={() => {
                routeChange(history, `/courses/${course.link}`);
              }}
            >
              <td className="Code" data-title="Code">
                {course.code}
              </td>
              <td className="Name" data-title="Name">
                {course.name}
              </td>
              <td className="Period" data-title="Period">
                {course.period}
              </td>
              <td className="Work" data-title="Work">
                {course.work > 0 && "+"}
                {course.work}%
              </td>
              <td className="Rank" data-title="Rank">
                {showAbsolutes
                  ? course.grade
                  : "letter" in course && course.letter}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="Counter">
        {courses.length}
        &nbsp;results
        <br />
        Last database update: 9.6.2020
      </p>
    </Container>
  );
};

export default ListComponent;
