import React from "react";
import { Container } from "reactstrap";

const TextComponent = () => (
  <Container className="Tin-Can">
    <p>
      <i>Would students graduate faster, if teaching was better?</i>
    </p>
    <p>
      <i>
        Hannula, the headmaster of TUT, says that the more university improves
        its teaching the more probable is that students enter working life
        before graduating. [...]
      </i>
    </p>
    <p>
      <i>
        The amount of funding universities receive from the ministry of
        education partially depends on how many people graduate from there.
      </i>
    </p>
    <p>
      <i>
        <a
          className="Aamulehti"
          rel="noopener noreferrer"
          target="_blank"
          href="https://www.aamulehti.fi/kotimaa/vain-yksi-kymmenesta-teekkarista-valmistuu-tavoiteajassa-ministeriolla-on-vahan-harhainen-kuva-24275601"
        >
          -Aamulehti 15.2.2017
        </a>
      </i>
    </p>

    <h2 className="Text-Title">Purpose</h2>
    <p>
      Due to the shortcomings of the Kaiku system, this web app was created.
    </p>
    <p>
      For example, if a course has a grade of 3, what does that mean? That's
      pretty good, right? In reality, it is not. The overwhelming majority
      (89.8% to be exact) of courses have an average Kaiku rating between 3 and
      4.5. With this app we now have the ability to compare courses and with the
      new ranking system we have a full scale again.
    </p>

    <h2 className="Text-Title">Grading</h2>
    <p>
      As long as there is sufficient data, this calculator grades every course
      the same way they are graded in Finnish matriculation exams (YO-exams).
      Any deviations are due to rounding. From best to worst, the grades are:
    </p>
    <table className="Grade-Table">
      <thead>
        <tr>
          <th>Grade</th>
          <th>Full name of grade</th>
          <th>Percentage</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>L</td>
          <td>Laudatur</td>
          <td>Best 5%</td>
        </tr>
        <tr>
          <td>E</td>
          <td>Eximia Cum Laude Approbatur</td>
          <td>Following 15%</td>
        </tr>
        <tr>
          <td>M</td>
          <td>Magna Cum Laude Approbatur</td>
          <td>Following 20%</td>
        </tr>
        <tr>
          <td>C</td>
          <td>Cum Laude Approbatur</td>
          <td>Following 24%</td>
        </tr>
        <tr>
          <td>B</td>
          <td>Lubenter Approbatur</td>
          <td>Following 20%</td>
        </tr>
        <tr>
          <td>A</td>
          <td>Approbatur</td>
          <td>Following 11%</td>
        </tr>
        <tr>
          <td>I</td>
          <td>Improbatur</td>
          <td>The rest</td>
        </tr>
      </tbody>
    </table>
    <p>
      For more information concerning this type of grading, see the related
      article on{" "}
      <a
        className="Aamulehti"
        href="https://en.wikipedia.org/wiki/Matriculation_exam_(Finland)#Scoring"
      >
        Wikipedia.
      </a>
    </p>
    <p>
      The "work" grade represents the effort/credits ratio. If everyone on the
      course though that it was fine, the grade is 0. If everyone chose option
      "too much work per credit" the grade is +100%. If 20% of participants
      judged the course to be to intensive and 15% too effortless, the resulting
      grade is the sum of these, in this case +5%.
    </p>

    <h2 className="Text-Title">Methodology</h2>
    <p>Courses excluded:</p>
    <ul>
      <li>All courses taught in English that have a Finnish equivalent</li>
      <li>
        All courses with less than 5 Kaiku votes because data is too unreliable
      </li>
      <li>
        All KIE (language center) courses because practically all of them are
        good
      </li>
      <li>All PLA (Pori) courses because I don't like Pori</li>
    </ul>
    <p>
      Only the ones with 21 or more votes are graded. This is because during
      empirical testing it was concluded that if the course has at least 21
      votes, the grade is at least somewhat reliable. The ones with fewer votes
      were still left in as a curiosity and for you to see what I'm talking
      about. Absolute grades from the Kaiku system were also left in for
      reference. If the same course is held in Finnish and in English the
      English entries are attempted to be removed. This is because the English
      variants seem to somehow have much better scores than the equivalent
      Finnish courses.
    </p>

    <h2 className="Text-Title">Faculty-O-Meter</h2>
    <p>
      Faculty-O-Meter lets you compare faculties with each other. Course ratings
      with same course code prefix were combined for use in the Faculty-O-Meter.
      All courses with 21 or more participants are included in Faculty-O-Meter.
    </p>
    <h2 className="Text-Title">Official badges available now</h2>
    <img
      className={"Badge"}
      src={"badge.svg"}
      alt={"Official Course-O-Meter overall badge"}
    />
  </Container>
);

export default TextComponent;
