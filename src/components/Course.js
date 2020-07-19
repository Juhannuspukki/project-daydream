import React from "react";
import { Container, Row, Col } from "reactstrap";
import ResponseRow from "./ResponseRow";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import CustomizedXAxisTick from "./CustomTick";

const Course = (props) => {
  const {
    match: {
      params: { id },
    },
    kaiku,
  } = props;
  const { name, instances } = kaiku.find((element) => element.id === id);

  const codes = [...new Set(instances.map((instance) => instance.code))];
  const letters = instances.map(
    (instance) => typeof instance.letter !== "undefined" && instance.letter
  );

  const chartData = instances.map((instance) => ({
    time: `${instance.year}\n${instance.period}`,
    grade: instance.grade,
    work: instance.work,
  }));

  const sampleSizeData = instances.map((instance) => ({
    time: `${instance.year}\n${instance.period}`,
    sampleSize: instance.sampleSize,
  }));

  const responses = instances.map(
    (instance) =>
      typeof instance.response !== "undefined" && {
        time: `${instance.year} ${instance.period}`,
        response: instance.response,
      }
  );

  responses.reverse();

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
        <h3 className="Course-Codes">{codes[0]}</h3>
        <p className="Old-Course-Codes">
          {codes.length > 1 &&
            `Previously known as ${codes.slice(1).join(", ")}`}
        </p>
      </div>
      {/*nextCourseId !== null && <Link id="nextLink" to={`/courses/${nextCourseId}`} />}
      {prevCourseId !== null && <Link id="prevLink" to={`/courses/${prevCourseId}`} />*/}
      <Row>
        <Col md="6" className="Course-Description-Box">
          <p className="Course-Grade-Pre-Title">Latest grade</p>
          <h3 className="Course-Grades">
            {letters[0] ? letters[letters.length - 1] : "-"}
          </h3>
        </Col>
        <Col md="6" className="Course-Description-Box">
          <p className="Course-Grade-Pre-Title">Latest work assessment</p>
          <h3 className="Course-Grades">
            {chartData[chartData.length - 1].work > 0 && "+"}
            {chartData[chartData.length - 1].work}%
          </h3>
        </Col>
      </Row>
      <Row className={instances.length === 1 ? "Hidden" : undefined}>
        <Col md="6" className="Chart">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} syncId="charts">
              <CartesianGrid strokeDasharray="10 10" />
              <XAxis
                dataKey="time"
                height={70}
                tick={<CustomizedXAxisTick />}
              />
              <YAxis
                dataKey="work"
                yAxisId="right"
                orientation="right"
                domain={[-50, 50]}
              />
              <YAxis dataKey="grade" yAxisId="left" domain={[2.5, 4.5]} />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="grade"
                stroke="#355f8c"
                name="Grade"
                style={{ color: "#fff" }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="work"
                stroke="#5f8c35"
                name="Work"
              />
            </LineChart>
          </ResponsiveContainer>
        </Col>
        <Col md="6" className="Chart">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={sampleSizeData}
              margin={{
                top: 0,
                right: 60,
                left: 0,
                bottom: 0,
              }}
              syncId="charts"
            >
              <CartesianGrid strokeDasharray="10 10" />
              <XAxis
                dataKey="time"
                height={70}
                tick={<CustomizedXAxisTick />}
              />
              <YAxis dataKey="sampleSize" yAxisId="left" />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <ReferenceLine yAxisId="left" y={21} stroke="red" />
              <Bar
                yAxisId="left"
                type="monotone"
                dataKey="sampleSize"
                fill="#8c355f"
                name="Sample Size"
                style={{ color: "#fff" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </Col>
      </Row>
      <div className="Course-Table-Container">
        <table className="Course-Table">
          <thead>
            <tr>
              <th>Year</th>
              <th>Period</th>
              <th>Samples</th>
              <th>Work</th>
              <th>Grade</th>
              <th>Relative Grade</th>
              <th>Response</th>
            </tr>
          </thead>
          <tbody>
            {instances
              .slice(0)
              .reverse()
              .map((instance) => (
                <ResponseRow
                  key={instance.year + instance.period + instance.grade}
                  instance={instance}
                />
              ))}
          </tbody>
        </table>
      </div>
      <Row>
        <Col md="6" className="Bottom-Links">
          <Link id="backLink" to="/">
            ← Back to course list
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Course;
