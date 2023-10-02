import React, { useContext, useEffect } from "react";
import { Typography, Container, Card, CardContent, Grid, CardMedia, Box } from "@mui/material";
import { UserContext } from "../context/UserContextProvider";
import { useMatch } from "react-router-dom";

function Content() {
  const { content, setContent } = useContext(UserContext);
  const isVideo = useMatch("/videos");
  const endpoint = isVideo ? "/videos" : "/articles";

  // fetch for videos
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(endpoint);
        const contentData = await res.json();
        setContent(contentData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchVideos();
  }, [endpoint]);

  const contentMap = content.map((content) => {
    return (
      <Grid item xs={12} key={content.id}>
        <a href={content.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
          <Card>
            <Grid container>
              <Grid item xs={4}>
                {/* Thumbnail Side */}
                <CardMedia component="img" image={content.thumbnail} alt={content.title} sx={{ aspectRatio: "16/9" }} />
              </Grid>
              <Grid item xs={8}>
                {/* Details Side */}
                <CardContent sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                  <Typography variant="h5" component="div">
                    {content.title}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ flex: "1 1 1" }}>
                    {content.description}
                  </Typography>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="caption" color="text.secondary">
                      Uploaded at: {content.uploaded_at}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Created at: {content.created_at}
                    </Typography>
                  </div>
                  <Typography variant="subtitle1" component="div">
                    Creator: {content.creator}
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </a>
      </Grid>
    );
  });
  return (
    <Container component="main" maxWidth="md" sx={{ mt: 10 }}>
      <Grid container spacing={4}>
        {contentMap}
      </Grid>
    </Container>
  );
}

export default Content;
