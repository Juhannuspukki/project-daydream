import React, { Component } from 'react';
import initial from '../faculties.json';
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import CustomizedXAxisTick from './CustomTick';
import { Container, Col, Row, CustomInput, Form, FormGroup } from 'reactstrap';
import './FacultyGraphs.css';
import generate from "string-to-color"
import NavBar from './NavBar'

class FacultyGraphs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      faculties: []
    };
    
    this.toggle = this.toggle.bind(this);
    
  }
  
  toggle(name) {
    let faculties = this.state.faculties;
    
    if (faculties.includes(name)) {
      let newFaculties = faculties.filter(faculty => faculty !== name);
      this.setState({
        faculties: newFaculties
      });
    }
    
    else {
      this.setState(prevState => ({
        faculties: [...prevState.faculties, name]
      }));
      }
    }
  
  render() {
    let faculties = initial.filter(faculty => this.state.faculties.includes(faculty.name));
    
    return (
      <Container>
        <NavBar pretitle="The astounding" title={"Faculty\u2011O\u2011Meter"}/>
        <h2 className="Title">Add to comparison</h2>
        <Form className="Form">
          <Row form>
          {initial.map(s => (
            <Col md={3} sm={4} xs={6} key={s.name}>
              <FormGroup className="Form-Group">
                <CustomInput className="Switch" type="switch" id={s.name} name={s.name} label={s.name}
                             onClick={ () => this.toggle(s.name)}/>
              </FormGroup>
            </Col>
          ))}
          </Row>
        </Form>
        <div className={(this.state.faculties.length === 0 ? "Hidden" : "undefined")}>
          <h2 className="Title">Average Grade</h2>
  
          <ResponsiveContainer width="100%" height={500}>
          <LineChart width={500} height={500} margin={{ top: 0, right: 54, left: 0, bottom: 64 }}>
            <CartesianGrid strokeDasharray="10 10" />
            <XAxis dataKey="year"
                   height={50}
                   type="category"
                   tick={<CustomizedXAxisTick/>}
                   allowDuplicatedCategory={false}
            />
            <YAxis dataKey="grade" yAxisId="left" domain={[3.1, 4.1]}/>
            <Tooltip />
            <Legend />
            {faculties.map(s => (
               <Line yAxisId="left" type="monotone" dataKey="grade" stroke={generate(s.name + "aquarius")} data={s.data} name={s.name} key={s.name} style={{color: '#fff'}}/>
            ))}
          </LineChart>
        </ResponsiveContainer>
        <h2 className="Title">Average Work</h2>
        <ResponsiveContainer width="100%" height={500}>
          <LineChart width={500} height={500} margin={{ top: 0, right: 54, left: 0, bottom: 64 }}>
            <CartesianGrid strokeDasharray="10 10" />
            <XAxis dataKey="year"
                   height={50}
                   type="category"
                   tick={<CustomizedXAxisTick/>}
                   allowDuplicatedCategory={false}
            />
            <YAxis dataKey="work" yAxisId="left"/>
            <Tooltip />
            <Legend />
            {faculties.map(s => (
              <Line yAxisId="left" type="monotone" dataKey="work" stroke={generate(s.name + "aquarius")} data={s.data} name={s.name} key={s.name} style={{color: '#fff'}}/>
            ))}
          </LineChart>
        </ResponsiveContainer>
        <h2 className="Title">Sample Size</h2>
        <ResponsiveContainer width="100%" height={500}>
          <LineChart width={500} height={500} margin={{ top: 0, right: 54, left: 0, bottom: 64 }}>
            <CartesianGrid strokeDasharray="10 10" />
            <XAxis dataKey="year"
                   height={50}
                   type="category"
                   tick={<CustomizedXAxisTick/>}
                   allowDuplicatedCategory={false}
            />
            <YAxis dataKey="sampleSize" yAxisId="left"/>
            <Tooltip />
            <Legend />
            {faculties.map(s => (
              <Line yAxisId="left" type="monotone" dataKey="sampleSize" stroke={generate(s.name + "aquarius")} data={s.data} name={s.name} key={s.name} style={{color: '#fff'}}/>
            ))}
          </LineChart>
        </ResponsiveContainer>
        <h2 className="Title">Course Count</h2>
        <ResponsiveContainer width="100%" height={500}>
          <LineChart width={500} height={500} margin={{ top: 0, right: 54, left: 0, bottom: 64 }}>
            <CartesianGrid strokeDasharray="10 10" />
            <XAxis dataKey="year"
                   height={50}
                   type="category"
                   tick={<CustomizedXAxisTick/>}
                   allowDuplicatedCategory={false}
            />
            <YAxis dataKey="courseCount" yAxisId="left"/>
            <Tooltip />
            <Legend />
            {faculties.map(s => (
              <Line yAxisId="left" type="monotone" dataKey="courseCount" stroke={generate(s.name + "aquarius")} data={s.data} name={s.name} key={s.name} style={{color: '#fff'}}/>
            ))}
          </LineChart>
        </ResponsiveContainer>
        </div>
      </Container>
    );
  }
}

export default FacultyGraphs;
