import React, { useContext } from "react";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Link, useLocation, useNavigate, useMatch } from "react-router-dom";
import Logout from "@mui/icons-material/Logout";
import Tooltip from "@mui/material/Tooltip";
import { UserContext } from "../context/UserContextProvider";

function Navbar() {
  const { setUser, setErrors, user } = useContext(UserContext);
  const navigate = useNavigate();

  const location = useLocation();
  const isSignup = useMatch("/signup");

  function handleLogOut() {
    fetch("/logout", {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setUser(null);
          navigate("/login");
        } else {
          console.error("Logout Failed");
        }
      })
      .catch((err) => {
        setErrors(err);
      });
  }
  const getTitle = (pathname) => {
    switch (pathname) {
      case "/":
        return "Home";
      case "/articles":
        return "Articles";
      case "/videos":
        return "Videos";
      case "/profile":
        return "Profile";
      case "/login":
        return "Login";
      case "/signup":
        return "Signup";
      default:
        return null;
    }
  };
  const title = getTitle(location.pathname);
  return (
    // Left side of Navbar
    <Box>
      <AppBar position="static" color={isSignup ? "secondary" : "primary"}>
        <Toolbar>
          <Tooltip title="Home">
            <Button startIcon={<HomeIcon />} sx={{ marginRight: 0.25 }} component={Link} to="/" color="inherit" />
          </Tooltip>
          <Tooltip title="Articles">
            <Button
              startIcon={<ArticleIcon />}
              sx={{ marginRight: 0.25 }}
              component={Link}
              to={user ? "/articles" : "/login"}
              color="inherit"
            />
          </Tooltip>
          <Tooltip title="Videos">
            <Button
              startIcon={<VideoLibraryIcon />}
              component={Link}
              to={user ? "/videos" : "/login"}
              color="inherit"
            />
          </Tooltip>
          {/* Space in Navbar */}

          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "center", marginRight: "70px" }}>
              {title}
            </Typography>
          </Box>

          {/* Right side of Navbar. */}
          <Tooltip title="Profile">
            <Button endIcon={<AccountBoxIcon />} component={Link} to={user ? "/profile" : "/login"} color="inherit" />
          </Tooltip>
          {/* If there is no user logged in the Log Out button is disabled. For title spacing issues when no button is present.*/}
          {user ? (
            <Tooltip title="Log Out">
              <Button endIcon={<Logout />} onClick={handleLogOut} color="inherit" />
            </Tooltip>
          ) : (
            <Tooltip title="Log Out">
              <span>
                <Button endIcon={<Logout />} color="inherit" disabled />
              </span>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
