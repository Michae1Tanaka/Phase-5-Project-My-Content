import React from "react";
import { Formik, Form, Field } from "formik";
import { Select, MenuItem, Button, TextField, Grid, Container, Tooltip, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

function AddContent() {
  const initialValues = {
    creator: "",
    title: "",
    thumbnail: "",
    description: "",
    created_at: "",
    url: "",
    type: "",
  };

  const tooltips = {
    creator: "The name of the content creator.",
    title: "The title of the content.",
    thumbnail: "A link to the thumbnail image.",
    description: "A brief description of the content.",
    created_at: "The date when the content was created.",
    url: "A link to the content.",
    type: "The type of the content (Video or Article).",
  };

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 10 }}>
      <Formik initialValues={initialValues}>
        <Form>
          <Grid container spacing={2}>
            {Object.keys(initialValues).map((key) => (
              <Grid item xs={12} key={key}>
                {key === "type" ? (
                  <Field name="type" as={Select} fullWidth variant="outlined">
                    <MenuItem value="">
                      <em>Type</em>
                    </MenuItem>
                    <MenuItem value="video">Video</MenuItem>
                    <MenuItem value="article">Article</MenuItem>
                  </Field>
                ) : key === "created_at" ? (
                  <Field name="created_at">
                    {({ field, meta }) => (
                      <TextField
                        {...field}
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                        variant="outlined"
                        InputProps={{
                          endAdornment: (
                            <Tooltip title={tooltips[key] || ""}>
                              <IconButton aria-label="info">
                                <InfoIcon />
                              </IconButton>
                            </Tooltip>
                          ),
                        }}
                      />
                    )}
                  </Field>
                ) : (
                  <Field name={key}>
                    {({ field, meta }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                        variant="outlined"
                        InputProps={{
                          endAdornment: (
                            <Tooltip title={tooltips[key] || ""}>
                              <IconButton aria-label="info">
                                <InfoIcon />
                              </IconButton>
                            </Tooltip>
                          ),
                        }}
                      />
                    )}
                  </Field>
                )}
              </Grid>
            ))}
          </Grid>
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Add Content
          </Button>
        </Form>
      </Formik>
    </Container>
  );
}

export default AddContent;
