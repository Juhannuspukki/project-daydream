import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import { Container } from 'reactstrap';

const changeColour = (cookies) => {
  if (document.body.classList.contains('Light')) {
    document.body.classList.remove('Light');
    cookies.set('theme', 'dark', { path: '/', maxAge: 31556952000 });
  } else {
    document.body.classList.add('Light');
    cookies.remove('theme', { path: '/' });
  }
};

const NavBar = (props) => {
  const {
    cookies,
    location: { pathname },
    history,
  } = props;
  return (
    <Container>
      <div className="Info-Button-Container">
        <button type="button" className="Colour-Button" onClick={() => changeColour(cookies)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z" />
          </svg>
        </button>
        {pathname === '/wtf'
          ? (
            <button type="button" className="Wtf-Button" onClick={() => history.goBack()}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                <path d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z" />
              </svg>
            </button>
          )
          : (
            <Link className="Info-Button" to="/wtf">
              <button type="button" className="Wtf-Button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512">
                  <path d="M20 424.229h20V279.771H20c-11.046 0-20-8.954-20-20V212c0-11.046 8.954-20 20-20h112c11.046 0 20 8.954 20 20v212.229h20c11.046 0 20 8.954 20 20V492c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20v-47.771c0-11.046 8.954-20 20-20zM96 0C56.235 0 24 32.235 24 72s32.235 72 72 72 72-32.235 72-72S135.764 0 96 0z" />
                </svg>
              </button>
            </Link>
          )
        }
      </div>
      <div>
        <Link className="Link-Button" to="/">
          <p className="Pre-Header">{pathname === '/faculty-o-meter' ? 'The astounding' : 'The incredible' }</p>
          <h1 className="Header">{pathname === '/faculty-o-meter' ? 'Faculty\u2011O\u2011Meter' : 'Course\u2011O\u2011Meter' }</h1>
        </Link>
      </div>
    </Container>
  );
};

export default withRouter(withCookies(NavBar));
