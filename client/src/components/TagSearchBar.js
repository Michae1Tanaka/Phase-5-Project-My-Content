import React, { useState, useEffect, useContext } from "react";
import { Formik, Form, Field } from "formik";
import { Box, Grid, TextField, Chip, Button } from "@mui/material";
import { UserContext } from "../context/UserContextProvider";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

function TagSearchBar({ isVideo }) {
  const [tags, setTags] = useState([]);
  const { setContent } = useContext(UserContext);
  const navigate = useNavigate();
  const endpoint = isVideo ? "Video" : "Article";
  const fetchEndpoint = isVideo ? "/videos" : "/articles";

  const fetchOriginalContent = async () => {
    try {
      const res = await fetch(fetchEndpoint);
      const data = await res.json();
      setContent(data);
    } catch (error) {
      console.error("Failed to fetch original content: ", error);
    }
  };

  const handleAddTag = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    if (newTags.length === 0) {
      fetchOriginalContent();
    }
  };
  const fetchContentByTag = async (tag) => {
    try {
      const res = await fetch(`/tags/${tag}/${endpoint}`);
      const data = await res.json();
      if (data) {
        setContent(data);
      } else {
        setContent([]);
      }
    } catch (error) {
      console.error("Failed to fetch content by tag: ", error);
    }
  };

  return (
    <Box sx={{ p: 2, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1 }}>
      <Formik
        initialValues={{ tag: "" }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleAddTag(values.tag);
          resetForm();
          setSubmitting(false);
          fetchContentByTag(values.tag);
        }}
      >
        <Form>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs style={{ flexGrow: 1 }}>
              <Field name="tag">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Search by tag"
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={{ width: "100%", height: 40 }}
                  />
                )}
              </Field>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SearchIcon />}
                type="submit"
                disabled={tags.length > 0}
              >
                Search
              </Button>
            </Grid>
            <Grid item>
              <Button
                sx={{ marginLeft: "50px" }}
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => navigate("/add-content")}
              >
                {isVideo ? "Add Video" : "Add Article"}
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {tags.map((tag) => (
          <Chip key={tag} label={tag} onDelete={() => handleRemoveTag(tag)} />
        ))}
      </Box>
    </Box>
  );
}

export default TagSearchBar;
