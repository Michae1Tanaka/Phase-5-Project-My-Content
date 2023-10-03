import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpLogIn from "./SignUpLogIn";
import HomePage from "./HomePage";
import Navbar from "./Navbar";
import ArticlesOrVideos from "./Content";
import Profile from "./Profile";
import { UserProvider, UserContext } from "../context/UserContextProvider";

function App() {
  const { setUser, setIsLoading } = useContext(UserContext);
  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/check_session");
        const userData = await res.json();
        setUser(userData);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" Component={HomePage} />
        <Route path="/login" Component={SignUpLogIn} />
        <Route path="/signup" Component={SignUpLogIn} />
        <Route path="/articles" Component={ArticlesOrVideos} />
        <Route path="/videos" Component={ArticlesOrVideos} />
        <Route path="/profile" Component={Profile} />
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
