import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const Footer = () => (
  <Container className="Tin-Can">
    <Row className="Footer-Row">
      <Col md="4">
        <a className="Footer-Logo" href="https://t.me/courserobot" target="_blank" rel="noopener noreferrer">CourseRobot</a>
      </Col>
      <Col md="4">
        <Link className="Footer-Logo" to="/">Course-O-Meter</Link>
      </Col>
      <Col md="4">
        <Link className="Footer-Logo" to="/faculty-o-meter">Faculty-O-Meter</Link>
      </Col>
    </Row>
  </Container>
);

export default Footer;
