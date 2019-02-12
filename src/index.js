import React from 'react';
import { hydrate, render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './components/App';
import { HashRouter } from 'react-router-dom'

const rootElement = document.getElementById('root');

if (rootElement.hasChildNodes()) {
  hydrate(
    <HashRouter>
      <App />
    </HashRouter>,
    rootElement);
} else {
  render(
    <HashRouter>
      <App />
    </HashRouter>,
    rootElement);
}
