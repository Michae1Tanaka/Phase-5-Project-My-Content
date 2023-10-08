import React, { useContext, useEffect } from "react";
import { Typography, Container, Card, CardContent, Grid, CardMedia, Box } from "@mui/material";
import { UserContext } from "../context/UserContextProvider";
import { useMatch } from "react-router-dom";
import NoContent from "./NoContent";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)({
  borderRadius: "8px",
  boxShadow: "0px 4px 6px rba(0,0,0,0.1)",
});

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

  const contentMap = content.map((content) => {
    return (
      <Grid item xs={12} key={content.id}>
        <a href={content.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
          <StyledCard>
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
                <CardContent sx={{ display: "flex", flexDirection: "column", height: "100%", padding: "16px" }}>
                  <Typography variant="h6" component="div" gutterBottom>
                    {content.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ flex: "1 1 1", marginBottom: "8px" }}>
                    {content.description}
                  </Typography>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Uploaded at: {content.uploaded_at.slice(0, 10)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Created at: {content.created_at ? content.created_at : "Unknown"}
                    </Typography>
                  </Box>
                  <Typography variant="subtitle2" component="div">
                    {content.creator ? content.creator : "Unknown"}
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
          </StyledCard>
        </a>
      </Grid>
    );
  });
  return content.length > 0 ? (
    <Container component="main" maxWidth="md" sx={{ mt: 10 }}>
      <Grid container spacing={4}>
        {contentMap}
      </Grid>
    </Container>
  ) : (
    <NoContent />
  );
}

export default Content;
