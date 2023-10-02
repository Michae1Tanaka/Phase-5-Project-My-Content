import React from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Link } from "react-router-dom";
import Logout from "@mui/icons-material/Logout";

function Navbar() {
  return (
    // Left side of Navbar
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Button startIcon={<HomeIcon />} sx={{ marginRight: 0.25 }} component={Link} to="/" color="inherit">
            Home
          </Button>
          <Button
            startIcon={<ArticleIcon />}
            sx={{ marginRight: 0.25 }}
            component={Link}
            to="/articles"
            color="inherit"
          >
            Articles
          </Button>
          <Button startIcon={<VideoLibraryIcon />} component={Link} to="/videos" color="inherit">
            Videos
          </Button>
          {/* Space in Navbar */}

          <Box sx={{ flexGrow: 1 }} />

          {/* Right side of Navbar. */}
          <Button endIcon={<AccountBoxIcon />} component={Link} to="/profile" color="inherit"></Button>
          <Button endIcon={<Logout />} component={Link} to="/login" color="inherit"></Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
