import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpLogIn from "./SignUpLogIn";
import HomePage from "./HomePage";
import Navbar from "./Navbar";
import ArticlesOrVideos from "./Content";
import { UserProvider, UserContext } from "../context/UserContextProvider";

function App() {
  const { setUser } = useContext(UserContext);

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
        <Route path="/articles" Component={ArticlesOrVideos} />
        <Route path="/videos" Component={ArticlesOrVideos} />
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
