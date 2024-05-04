import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Baraa from "./pages/Baraa/baraa";
import Market from "./pages/Delguur/delguur";
import Friends from "./pages/Friends/Friends";
import SignUp from "./pages/Signup/SignUp";
import Login from "./pages/Login/Login";
import Balance from "./pages/balance";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="baraa" element={<Baraa />} />
          <Route path="market" element={<Market />} />
          <Route path="friends" element={<Friends />} />
          <Route path="balance" element={<Balance />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to={"login"} />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
