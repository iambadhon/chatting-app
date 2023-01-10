import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import "simplebar-react/dist/simplebar.min.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import firebaseConfig from "./firebaseConfig";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
