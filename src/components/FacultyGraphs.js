import React, { Component } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Container, Col, Row, CustomInput, Form, FormGroup } from "reactstrap";
import generate from "string-to-color";
import { Helmet } from "react-helmet";
import initial from "../faculties.json";
import CustomizedXAxisTick from "./CustomTick";

class FacultyGraphs extends Component {
  constructor(props) {
    super(props);

    const visibleFaculties = initial.reduce((accumulator, currentValue) => {
      accumulator.push(currentValue.name);
      return accumulator;
    }, []);

    this.state = {
      visibleFaculties,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle(name) {
    const { visibleFaculties } = this.state;

    if (visibleFaculties.includes(name)) {
      const newFaculties = visibleFaculties.filter(
        (faculty) => faculty !== name
      );
      this.setState({
        visibleFaculties: newFaculties,
      });
    } else {
      this.setState((prevState) => ({
        visibleFaculties: [...prevState.visibleFaculties, name],
      }));
    }
  }

  render() {
    const { visibleFaculties } = this.state;

    const faculties = initial.filter((faculty) =>
      visibleFaculties.includes(faculty.name)
    );

    return (
      <Container>
        <Helmet>
          <title>Faculty-O-Meter</title>
          <meta
            name="description"
            content="What is the hottest faculty of the campus? Use this tool to find out."
          />
          <meta property="og:title" content="The astounding Faculty-O-Meter" />
          <meta
            property="og:url"
            content="https://course-o-meter.com/faculty-o-meter"
          />
          <meta
            property="og:description"
            content="What is the hottest faculty of the campus? Use this tool to find out."
          />
        </Helmet>
        <h2 className="Title">Add to comparison</h2>
        <Form className="Form">
          <Row form>
            {initial.map((s) => (
              <Col md={3} sm={4} xs={6} key={s.name}>
                <FormGroup className="Form-Group">
                  <CustomInput
                    defaultChecked="true"
                    className="Switch"
                    type="switch"
                    id={s.name}
                    name={s.name}
                    label={s.name}
                    onClick={() => this.toggle(s.name)}
                  />
                </FormGroup>
              </Col>
            ))}
          </Row>
        </Form>
        <div className={visibleFaculties.length === 0 ? "Hidden" : "undefined"}>
          <h2 className="Title">Average Grade</h2>

          <ResponsiveContainer width="100%" height={500}>
            <LineChart
              width={500}
              height={500}
              margin={{
                top: 0,
                right: 54,
                left: 0,
                bottom: 64,
              }}
            >
              <CartesianGrid strokeDasharray="10 10" />
              <XAxis
                dataKey="year"
                height={50}
                type="category"
                tick={<CustomizedXAxisTick />}
                allowDuplicatedCategory={false}
              />
              <YAxis dataKey="grade" yAxisId="left" domain={[3.1, 4.1]} />
              <Tooltip />
              <Legend />
              {faculties.map((s) => (
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="grade"
                  stroke={generate(`${s.name}aquarius`)}
                  data={s.data}
                  name={s.name}
                  key={s.name}
                  style={{ color: "#fff" }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
          <h2 className="Title">Average Work</h2>
          <ResponsiveContainer width="100%" height={500}>
            <LineChart
              width={500}
              height={500}
              margin={{
                top: 0,
                right: 54,
                left: 0,
                bottom: 64,
              }}
            >
              <CartesianGrid strokeDasharray="10 10" />
              <XAxis
                dataKey="year"
                height={50}
                type="category"
                tick={<CustomizedXAxisTick />}
                allowDuplicatedCategory={false}
              />
              <YAxis dataKey="work" yAxisId="left" />
              <Tooltip />
              <Legend />
              {faculties.map((s) => (
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="work"
                  stroke={generate(`${s.name}aquarius`)}
                  data={s.data}
                  name={s.name}
                  key={s.name}
                  style={{ color: "#fff" }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
          <h2 className="Title">Sample Size</h2>
          <ResponsiveContainer width="100%" height={500}>
            <LineChart
              width={500}
              height={500}
              margin={{
                top: 0,
                right: 54,
                left: 0,
                bottom: 64,
              }}
            >
              <CartesianGrid strokeDasharray="10 10" />
              <XAxis
                dataKey="year"
                height={50}
                type="category"
                tick={<CustomizedXAxisTick />}
                allowDuplicatedCategory={false}
              />
              <YAxis dataKey="sampleSize" yAxisId="left" />
              <Tooltip />
              <Legend />
              {faculties.map((s) => (
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="sampleSize"
                  stroke={generate(`${s.name}aquarius`)}
                  data={s.data}
                  name={s.name}
                  key={s.name}
                  style={{ color: "#fff" }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
          <h2 className="Title">Course Count</h2>
          <ResponsiveContainer width="100%" height={500}>
            <LineChart
              width={500}
              height={500}
              margin={{
                top: 0,
                right: 54,
                left: 0,
                bottom: 64,
              }}
            >
              <CartesianGrid strokeDasharray="10 10" />
              <XAxis
                dataKey="year"
                height={50}
                type="category"
                tick={<CustomizedXAxisTick />}
                allowDuplicatedCategory={false}
              />
              <YAxis dataKey="courseCount" yAxisId="left" />
              <Tooltip />
              <Legend />
              {faculties.map((s) => (
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="courseCount"
                  stroke={generate(`${s.name}aquarius`)}
                  data={s.data}
                  name={s.name}
                  key={s.name}
                  style={{ color: "#fff" }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Container>
    );
  }
}

export default FacultyGraphs;
