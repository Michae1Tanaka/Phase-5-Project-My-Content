import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpLogIn from "./SignUpLogIn";
import HomePage from "./HomePage";
import Navbar from "./Navbar";
import { UserProvider, UserContext } from "../context/UserContextProvider";

function App() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
        });
      }
    });
  }, [setUser]);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" Component={HomePage} />
        <Route path="/login" Component={SignUpLogIn} />
        <Route path="/signup" Component={SignUpLogIn} />
      </Routes>
    </Router>
  );
}

export default function WrappedApp() {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
}
