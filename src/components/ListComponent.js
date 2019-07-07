import React from 'react';
import './ListComponent.scss';
import _ from 'underscore';
import { Container } from 'reactstrap';
import SearchForm from './SearchForm';
import Settings from './Settings';
import NavBar from './NavBar';

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
    settings: {showAll, filter, year, showAbsolutes, sort: { column, direction },
    },
  } = props;

  let counter = 0;

  return (
    <Container>
      <NavBar pretitle="The incredible" title={'Course\u2011O\u2011Meter'} />
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
      <table className="List-Component">
        <thead>
          <tr>
            <th className="Code" onClick={() => onSort('code')}>
              Code&nbsp;
              {
                column === 'code' && (direction === 'asc' ? '↑' : '↓')
              }
            </th>
            <th className="Name" onClick={() => onSort('name')}>
              Name&nbsp;
              {
                column === 'name' && (direction === 'asc' ? '↑' : '↓')
              }
            </th>
            <th className="Work" onClick={() => onSort('work')}>
              Work&nbsp;
              {
                column === 'work' && (direction === 'asc' ? '↑' : '↓')
              }
            </th>
            <th className="Rank" onClick={() => onSort('grade')}>
              Rank&nbsp;
              {
                column === 'grade' && (direction === 'asc' ? '↑' : '↓')
              }
            </th>
          </tr>
        </thead>
        <tbody>
          {_.map(courses, (course) => {
            if (
              (
                (showAll === true)
                || (showAll === false
                && 'letter' in course)
              )
              && (course.code.toLowerCase().includes(filter)
              || course.name.toLowerCase().includes(filter))) {
              counter += 1;
              return (
                <tr
                  key={course.code}
                  data-item={course}
                  onClick={() => {
                    routeChange(history, `/courses/${course.id}`);
                  }}
                >
                  <td className="Code" data-title="Code">
                    {course.code}
                  </td>
                  <td className="Name" data-title="Name">
                    {course.name}
                  </td>
                  <td className="Work" data-title="Work">
                    {(course.work > 0) && '+'}
                    {course.work}
                    %
                  </td>
                  <td
                    className="Rank"
                    data-title="Rank"
                  >
                    {showAbsolutes ? course.grade : (('letter' in course) && course.letter)}
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
      <p className="Counter">
        {counter}
        &nbsp;results
        <br />
        Last database update: 7.7.2019
      </p>
    </Container>
  );
};

export default ListComponent;
