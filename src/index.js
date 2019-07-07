import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './components/App';

const rootElement = document.getElementById('root');

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>, rootElement);
} else {
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>, rootElement);
}
