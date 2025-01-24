import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./css/index.css";
import AuthenticationProvider from "./providers/AuthenticationProvider";
import RootNavigation from "./RootNavigation";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthenticationProvider>
      <BrowserRouter>
        <RootNavigation />
      </BrowserRouter>
    </AuthenticationProvider>
  </React.StrictMode>
);