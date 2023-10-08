import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpLogIn from "./SignUpLogIn";
import HomePage from "./HomePage";
import Navbar from "./Navbar";
import ContentContainer from "./ContentContainer";
import Profile from "./Profile";
import AddContent from "./AddContent";
import { UserProvider, UserContext } from "../context/UserContextProvider";

function App() {
  const { setUser, setIsLoading } = useContext(UserContext);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/check_session");
        const userData = await res.json();
        if (res.ok) {
          setUser(userData);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("No user was found");
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
        <Route path="/articles" Component={ContentContainer} />
        <Route path="/videos" Component={ContentContainer} />
        <Route path="/profile" Component={Profile} />
        <Route path="/add-content" Component={AddContent} />
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
