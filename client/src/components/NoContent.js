import React from "react";
import { Typography, Container, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function NoContent() {
  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 10, textAlign: "center" }}>
      <Box sx={{ my: 5 }}>
        <Typography variant="h4" gutterBottom>
          No Content Available
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          It looks like you haven't added any content yet.
        </Typography>
        <Typography variant="subtitle1">
          To get started, click the button below to add your first piece of content.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button variant="contained" color="primary" onClick={() => navigate("/add-content")}>
            Add Content
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default NoContent;
