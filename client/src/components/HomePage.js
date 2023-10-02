import React from "react";
import { Container, Typography, Box, Button, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Container component="main" maxWidth="md">
      {/* Header/Welcome Section */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to <strong>My Content!</strong>
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          A Safe and Educative Content Management Platform
        </Typography>
      </Box>

      {/* About Section */}
      <Paper elevation={3} sx={{ p: 4, my: 4 }}>
        <Typography variant="h4" component="h3" gutterBottom>
          About My Content
        </Typography>
        <Typography variant="body1" paragraph>
          My Content is designed to be a secure and educative environment where users can manage and access content that
          is safe and informative. The platform offers features like content submission, category creation, and user
          authentication to ensure a personalized and secure experience.
        </Typography>
      </Paper>

      {/* Features Section */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h3" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Content Management
              </Typography>
              <Typography variant="body2">
                Easily submit and manage diverse content, including articles and videos.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                User Authentication
              </Typography>
              <Typography variant="body2">
                Secure signup and login to keep your content and information safe.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Updates/Coming Soon Section */}
      <Paper elevation={3} sx={{ p: 4, my: 4 }}>
        <Typography variant="h4" component="h3" gutterBottom>
          New Feature Requests!
        </Typography>
        <Typography variant="body1" paragraph>
          I am actively soliciting suggestions for new features, as it is paramount to me that this app evolves to meet
          the needs and desires of its users. I am committed to continual refinement and expansion of this project to
          ensure it remains a pivotal and valuable resource for everyone. My Content is an open-source project.
          Experienced users and developers are encouraged to contribute by submitting their innovative ideas and
          enhancements directly via my{" "}
          <a
            href="https://github.com/Michae1Tanaka/Phase-5-Project-My-Content"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub repository
          </a>
          . This collaborative approach ensures the ongoing improvement and diversification of features available within
          the app. I welcome and value all feedback, insights, and ideas to make My Content more user-friendly,
          versatile, and comprehensive. Please do not hesitate to reach out and share your thoughts at fake@email.com! I
          am eager to hear from you, and together, let's make My Content the best and most inclusive platform it can be!
        </Typography>
      </Paper>
    </Container>
  );
}

export default Home;
