import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./SignUpLogIn";
import HomePage from "./HomePage";
import Navbar from "./Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" Component={HomePage} />
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={Login} />
      </Routes>
    </Router>
  );
}

export default App;
