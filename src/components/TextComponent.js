import React from 'react'
import { Container } from 'reactstrap'
import './TextComponent.css';
import NavBar from "./NavBar";

const TextComponent = () => (
  <Container className={"Tin-Can"}>
    <NavBar pretitle="The incredible" title={"Course\u2011O\u2011Meter"}/>
    <p><i>Would students graduate faster, if teaching was better?</i></p>
    <p><i>Hannula, the headmaster of TUT, says that the more university improves its teaching the more probable is that students enter working life before graduating. [...]</i></p>
    <p><i>The amount of funding universities receive from the ministry of education partially depends on how many people graduate from there.</i></p>
    <p><i><a className={"Aamulehti"} rel="noopener noreferrer" target="_blank" href="https://www.aamulehti.fi/kotimaa/vain-yksi-kymmenesta-teekkarista-valmistuu-tavoiteajassa-ministeriolla-on-vahan-harhainen-kuva-24275601">-Aamulehti 15.2.2017</a></i></p>
    <h2 className="Text-Title">Purpose</h2>
    <p>Due to the shortcomings of the Kaiku system, this web app was created.</p>
    <p>For example, if a course has a grade of 3, what does that mean? That's pretty good, right?
      In reality, it is not. The overwhelming majority (89.8% to be exact) of courses have an average Kaiku rating between 3 and 4.5.
      With this app we now have the ability to compare courses and with the new ranking system we have a full scale again.</p>
    <h2 className="Text-Title">Grading</h2>
    <p>As long as there is sufficient data, this calculator grades every course the same way they are graded in YO-exams. Any deviations are due to rounding.</p>
    <ul>
      <li>L: best 5%</li>
      <li>E: following 15%</li>
      <li>M: following 20%</li>
      <li>C: following 24%</li>
      <li>B: following 20%</li>
      <li>A: following 11%</li>
      <li>I: the rest</li>
    </ul>
    <p>The "work" grade represents the effort/credits ratio. If everyone on the course though that it was fine, the grade is 0.
    If everyone chose option "too much workload for credits" the grade is +100%. If 20% of participants judged the course to be to intensive and 15% too effortless,
    the resulting grade is the sum of these, in this case +5%.</p>
    <h2 className="Text-Title">Methodology</h2>
    <p>Courses excluded:</p>
    <ul>
      <li>All courses taught in English that have a Finnish equivalent</li>
      <li>All courses with less than 5 Kaiku votes because data is too unreliable</li>
      <li>All KIE (language center) courses because practically all of them are good</li>
      <li>All PLA (Pori) courses because I don't like Pori</li>
    </ul>
    <p>
      Only the ones with 21 or more votes are graded. This is because during empirical testing it was concluded that if
      the course has at least 21 votes, the grade is at least somewhat reliable. The ones with fewer votes were still
      left in as a curiosity and for you to see what I'm talking about. Absolute grades from the Kaiku system were also
      left in for reference. If the same course is held in Finnish and in English the English entries are removed. This
      is because the English variants seem to somehow have much better scores than the equivalent Finnish courses.
      If a course is held several times during a year, it is still treated as a single course.
    </p>
    <h2 className="Text-Title">Faculty-O-Meter</h2>
    <p>Faculty-O-Meter lets you compare faculties with each other. Course ratings with same course code prefix were combined
      for use in the Faculty-O-Meter. All courses with 21 or more participants are included in Faculty-O-Meter. </p>
  </Container>
);

export default TextComponent
