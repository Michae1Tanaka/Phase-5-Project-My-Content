import React from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Button endIcon={<HomeIcon />} sx={{ marginRight: 0.25 }} component={Link} to="/" color="inherit">
            Home
          </Button>
          <Button endIcon={<ArticleIcon />} sx={{ marginRight: 0.25 }} component={Link} to="/articles" color="inherit">
            Articles
          </Button>
          <Button endIcon={<VideoLibraryIcon />} component={Link} to="/videos" color="inherit">
            Videos
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <Button endIcon={<AccountBoxIcon />} component={Link} to="/profile" color="inherit">
            Profile
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
