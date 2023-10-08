import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import { Select, MenuItem, Button, TextField, Grid, Container, Tooltip, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { UserContext } from "../context/UserContextProvider";
import { string, object, date } from "yup";
import { useNavigate } from "react-router-dom";

function AddContent() {
  const { content, setContent } = useContext(UserContext);
  const navigate = useNavigate();

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
    creator: "The name of the content creator. If left blank the creator will be 'Unknown'.",
    title: "The title of the content.",
    thumbnail: "A link to the thumbnail image.",
    description: "A brief description of the content.",
    created_at: "The date when the content was created.",
    url: "A link to the content.",
    type: "The type of the content (Video or Article).",
  };

  const createContentSchema = object().shape({
    creator: string()
      .min(5, "Username must be more than 4 characters.")
      .max(24, "Username must be less than 25 characters."),
    title: string()
      .required("A title is required.")
      .min(3, "Title must more than 2 characters.")
      .max(64, "Title must be less than 65 characters."),
    thumbnail: string().url(),
    description: string()
      .required("Description is required.")
      .min(16, "Description must be more than 15 characters.")
      .max(64, "Description must be less than 65 characters."),
    created_at: date(),
    url: string().required("URL is required.").url(),
    type: string()
      .required("Type is required.")
      .oneOf(["Video", "Article"], 'Type must be either "Video" or "Article".'),
  });

  async function handleNewContentSubmit(values, { setSubmitting }) {
    try {
      const response = await fetch("/add_content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        const newContent = await response.json();
        setContent(...content, newContent);
        navigate("/");
      } else {
        const err = await response.json();
        console.error(err);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  return (
    <Container component="main" maxWidth="md" sx={{ mt: 10 }}>
      <Formik initialValues={initialValues} validationSchema={createContentSchema} onSubmit={handleNewContentSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <Grid container spacing={2}>
              {Object.keys(initialValues).map((key) => (
                <Grid item xs={12} key={key}>
                  <Field name={key}>
                    {({ field, meta }) => (
                      <div>
                        {key === "type" ? (
                          <Select {...field} fullWidth variant="outlined" displayEmpty>
                            <MenuItem value="">Type</MenuItem>
                            <MenuItem value="Video">Video</MenuItem>
                            <MenuItem value="Article">Article</MenuItem>
                          </Select>
                        ) : (
                          <TextField
                            {...field}
                            fullWidth
                            type={key === "created_at" ? "date" : "text"}
                            label={key.charAt(0).toUpperCase() + key.slice(1)}
                            variant="outlined"
                            error={meta.touched && !!meta.error}
                            helperText={meta.touched && meta.error}
                            InputProps={{
                              endAdornment: (
                                <Tooltip title={tooltips[key] || ""}>
                                  <IconButton aria-label="info">
                                    <InfoIcon />
                                  </IconButton>
                                </Tooltip>
                              ),
                            }}
                            InputLabelProps={key === "created_at" ? { shrink: true } : {}}
                          />
                        )}
                      </div>
                    )}
                  </Field>
                </Grid>
              ))}
            </Grid>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} disabled={isSubmitting}>
              Add Content
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default AddContent;
