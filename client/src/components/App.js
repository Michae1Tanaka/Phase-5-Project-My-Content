import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" Component={Login} />
      </Routes>
    </Router>
  );
}

export default App;
