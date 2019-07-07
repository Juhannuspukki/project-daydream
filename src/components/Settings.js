import React from 'react';
import { ButtonGroup, Button } from 'reactstrap';
import './Settings.scss';

const Settings = (props) => {
  const { showAll, showAbsolutes, handleClick } = props;
  return (
    <ButtonGroup className="Control-Buttons">
      <Button className="Glowless" onClick={() => handleClick('showAll')}>
        Show&nbsp;
        {showAll ? 'graded' : 'all'}
        &nbsp;courses
      </Button>
      <Button className="Glowless" onClick={() => handleClick('showAbsolutes')}>
        Show&nbsp;
        {showAbsolutes ? 'relative' : 'absolute'}
        &nbsp;grades
      </Button>
    </ButtonGroup>
  );
}

export default Settings;
