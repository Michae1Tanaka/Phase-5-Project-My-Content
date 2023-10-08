import React, { useContext, useEffect } from "react";
import { Tooltip, Button, Typography, Container, Card, CardContent, Grid, CardMedia, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { UserContext } from "../context/UserContextProvider";
import { useMatch } from "react-router-dom";
import NoContent from "./NoContent";

function Content() {
  const { content, setContent } = useContext(UserContext);
  const isVideo = useMatch("/videos");
  const endpoint = isVideo ? "/videos" : "/articles";

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch(endpoint);
        const contentData = await res.json();
        setContent(contentData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchContent();
  }, [endpoint]);

  const handleDelete = async (event, contentID) => {
    event.preventDefault();

    try {
      const res = await fetch(`${endpoint}/${contentID}`, {
        method: "DELETE",
      });

      if (res.ok) {
        const newContent = content.filter((item) => item.id !== contentID);
        setContent(newContent);
      } else {
        console.error("Failed to delete content");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const contentMap = content.map((content) => {
    return (
      <Grid item xs={12} key={content.id}>
        <a href={content.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
          <Card>
            <Grid container>
              <Grid item xs={4}>
                {/* Thumbnail Side */}
                <CardMedia
                  component="img"
                  image={content._thumbnail}
                  alt={content.title}
                  sx={{ width: "100%", objectFit: "cover", height: "200px", borderRadius: "8px 0 0 8px" }}
                />
              </Grid>
              <Grid item xs={8}>
                {/* Details Side */}
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    padding: "16px",
                  }}
                >
                  <Typography variant="h6" component="div" gutterBottom textAlign={"center"}>
                    {content.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ flex: "1 1 1", marginBottom: "8px" }}>
                    {content.description}
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "4px",
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Uploaded at: {content.uploaded_at.slice(0, 10)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Created at: {content.created_at ? content.created_at.slice(0, 10) : "Unknown"}
                    </Typography>
                  </div>
                  <Typography variant="subtitle1" component="div">
                    Creator: {content._creator ? content._creator : "Unknown"}
                  </Typography>
                  {/* Edit and Delete Buttons */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                      mt: "20px",
                      width: "100%",
                    }}
                  >
                    <Tooltip title="Edit">
                      <Button aria-label="edit">
                        <EditIcon />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <Button aria-label="delete" onClick={(event) => handleDelete(event, content.id)}>
                        <DeleteIcon />
                      </Button>
                    </Tooltip>
                  </Box>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </a>
      </Grid>
    );
  });
  return content.length > 0 ? (
    <Container component="main" maxWidth="md" sx={{ mt: 10, boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
      <Grid container spacing={4}>
        {contentMap}
      </Grid>
    </Container>
  ) : (
    <NoContent />
  );
}

export default Content;
