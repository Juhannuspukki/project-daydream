import React from 'react';
import './NavBar.scss';
import { Link } from 'react-router-dom';

const NavBar = (props) => {
  const { pretitle, title } = props;
  return (
    <div>
      <div className="Info-Button-Container">
        <Link className="Info-Button" to="/wtf">?</Link>
      </div>
      <div>
        <Link className="Link-Button" to="/">
          <p className="Pre-Header">{pretitle}</p>
          <h1 className="Header">{title}</h1>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
