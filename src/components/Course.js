import React, { useEffect } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { Container, Row, Col } from 'reactstrap';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import kaiku from '../kaiku.json';
import CustomizedXAxisTick from './CustomTick';

const getNext = (courseList, id) => {
  const nextIndex = courseList.findIndex(element => element.id === id) + 1;
  return nextIndex >= courseList.length ? null : courseList[nextIndex].id;
};

const getPrevious = (courseList, id) => {
  const prevIndex = courseList.findIndex(element => element.id === id) - 1;
  return prevIndex < 0 ? null : courseList[prevIndex].id;
};

const processData = (props) => {
  const { courseList } = props;
  const course = kaiku.find(element => element.id === props.match.params.id);
  const { name, id, period, link } = course;

  const chartData = [];
  const sampleData = [];
  const codes = [];
  const letters = [];
  const numbers = [];

  const nextCourseId = getNext(courseList, id);
  const prevCourseId = getPrevious(courseList, id);

  course.instances.map((instance) => {
    chartData.push(
      {
        year: instance.year,
        grade: instance.grade,
        work: instance.work,
      },
    );

    if (codes.indexOf(instance.code) === -1) {
      codes.push(instance.code);
    }

    sampleData.push({ year: instance.year, sampleSize: instance.sampleSize });

    if (instance.letter) {
      letters.push({ letter: instance.letter, year: instance.year });
    }

    numbers.push({ work: instance.work, year: instance.year });

    return null;
  });

  codes.reverse();

  return ({
    nextCourseId,
    prevCourseId,
    name,
    id,
    period,
    link,
    chartData,
    sampleData,
    codes,
    letters,
    numbers,
  });
};

const downHandler = ({ key }) => {
  if (key === 'ArrowDown' && document.getElementById('nextLink') !== null) {
    document.getElementById('nextLink').click();
  } else if (key === 'ArrowUp' && document.getElementById('prevLink') !== null) {
    document.getElementById('prevLink').click();
  } else if (key === 'ArrowLeft') {
    document.getElementById('backLink').click();
  }
};

const Course = (props) => {
  const {
    nextCourseId,
    prevCourseId,
    name,
    id,
    period,
    link,
    chartData,
    codes,
    sampleData,
    letters,
    numbers,
  } = processData(props);

  useEffect(() => {
    document.addEventListener('keydown', downHandler);
    // Remove event listeners on cleanup
    return () => {
      document.removeEventListener('keydown', downHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount


  return (
    <Container>
      <Helmet>
        <title>{`${name} - Course-O-Meter`}</title>
        <meta
          name="description"
          content="Course-O-Meter gives new grades to Tampere University courses and lets you
            compare them with each other. An invaluable tool for planning your studies!"
        />
        <meta
          property="og:title"
          content={`${name} - The incredible Course-O-Meter`}
        />
        <meta
          property="og:url"
          content={`https://course-o-meter.com/courses/${id}`}
        />
        <meta
          property="og:description"
          content={`View the detailed history of course "${name}" on Course-O-Meter.com`}
        />
      </Helmet>
      <div className="Course-Name-Box">
        <h2 className="Course-Name">{`${name}`}</h2>
        <p className="Course-Period">{`${period.includes('-') ? 'Periods' : 'Period'} ${period}`}</p>
        <h3 className="Course-Codes">
          {codes[0]}
        </h3>
        <p className="Old-Course-Codes">{(codes.length > 1) && (`Previously known as ${(codes.slice(1).join(', '))}`)}</p>
      </div>
      {nextCourseId !== null && <Link id="nextLink" to={`/courses/${nextCourseId}`} />}
      {prevCourseId !== null && <Link id="prevLink" to={`/courses/${prevCourseId}`} />}
      <Row>
        <Col md="6" className="Course-Description-Box">
          <p className="Course-Grade-Pre-Title">Latest grade</p>
          <h3 className="Course-Grades">
            { (letters.length > 0) ? letters[letters.length - 1].letter : '-' }
          </h3>
          <p className="Course-Grades-Pre-Title">Previous grades</p>
          <p>
            { (letters.length > 1)
              ? letters.slice(0, -1).map(s => (
                <React.Fragment key={s.year}>
                  <span className="Course-Grades-Previous">
                    {s.letter}
                  </span>
                  <sub>
                    {`(${s.year}) `}
                    &nbsp;
                  </sub>
                </React.Fragment>
              )) : '-'}
          </p>
        </Col>
        <Col md="6" className="Course-Description-Box">
          <p className="Course-Grade-Pre-Title">Latest work assesment</p>
          <h3 className="Course-Grades">
            {numbers[numbers.length - 1].work > 0 && '+'}
            { numbers[numbers.length - 1].work }
          </h3>
          <p className="Course-Grades-Pre-Title">Previous work assessments</p>
          <p>
            { (numbers.length > 1)
              ? numbers.slice(0, -1).map(s => (
                <React.Fragment key={s.year}>
                  <span className="Course-Grades-Previous">
                    {s.work > 0 && '+'}
                    {s.work}
                  </span>
                  <sub>
                    {`(${s.year}) `}
                  </sub>
                </React.Fragment>
              )) : '-'}
          </p>
        </Col>
      </Row>
      <Row>
        <Col md="6" className="Chart">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} syncId="charts">
              <CartesianGrid strokeDasharray="10 10" />
              <XAxis dataKey="year" height={50} tick={<CustomizedXAxisTick />} />
              <YAxis dataKey="grade" yAxisId="left" domain={[2.5, 4.5]} />
              <YAxis dataKey="work" yAxisId="right" orientation="right" domain={[-50, 50]} />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="grade" stroke="#355f8c" name="Grade" style={{ color: '#fff' }} />
              <Line yAxisId="right" type="monotone" dataKey="work" stroke="#5f8c35" name="Work" />
            </LineChart>
          </ResponsiveContainer>
        </Col>
        <Col md="6" className="Chart">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={sampleData}
              margin={{
                top: 0, right: 60, left: 0, bottom: 0,
              }}
              syncId="charts"
            >
              <CartesianGrid strokeDasharray="10 10" />
              <XAxis dataKey="year" height={50} tick={<CustomizedXAxisTick />} />
              <YAxis dataKey="sampleSize" yAxisId="left" />
              <Tooltip />
              <Legend />
              <ReferenceLine yAxisId="left" y={21} stroke="red" />
              <Line yAxisId="left" type="monotone" dataKey="sampleSize" stroke="#8c355f" name="Sample Size" style={{ color: '#fff' }} />
            </LineChart>
          </ResponsiveContainer>
        </Col>
      </Row>
      <Row>
        <Col md="6" className="Bottom-Links">
          <Link id="backLink" to="/">← Back to course list</Link>
        </Col>
        {link
          && (
          <Col md="6" className="Bottom-Links">
            <a href={`https://poprock.tut.fi/group/pop/opas/opintojaksot/-/opintojakso/2019-2020/${link}`} target="_blank" rel="noopener noreferrer">
            View on POP →
            </a>
          </Col>
          )
        }
      </Row>
    </Container>
  );
};


export default Course;
