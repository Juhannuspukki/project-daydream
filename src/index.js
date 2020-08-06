import React from "react";
import { hydrate, render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./components/App";
import { CookiesProvider } from "react-cookie";

const rootElement = document.getElementById("root");

const childElement = (
  <BrowserRouter>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </BrowserRouter>
);

if (rootElement.hasChildNodes()) {
  hydrate(childElement, rootElement);
} else {
  render(childElement, rootElement);
}
