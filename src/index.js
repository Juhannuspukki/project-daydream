import React from 'react';
import { hydrate, render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom'

const rootElement = document.getElementById('root');

if (rootElement.hasChildNodes()) {
  hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  rootElement);
} else {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  rootElement);
}
