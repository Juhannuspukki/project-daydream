import React from 'react';
import { Container } from 'reactstrap';

const WrongBrowser = () => (
  <Container>
    <h1 className="Header Browser-Header">Please install a web browser to continue.</h1>
    <a
      href="https://www.mozilla.org/en-US/firefox/new/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src="/firefox.svg" alt="firefox" width="33%" className="BrowserPic" />
    </a>
    <a
      href="https://www.apple.com/lae/safari/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src="/safari.svg" alt="safari" width="33%" className="BrowserPic" />
    </a>
    <a
      href="https://support.google.com/chrome/answer/95346?co=GENIE.Platform%3DDesktop&hl=en-GB"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src="/chrome.svg" alt="chrome" width="33%" className="BrowserPic" />
    </a>
  </Container>
);


export default WrongBrowser;
