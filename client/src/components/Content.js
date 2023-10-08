import React from "react";
import {
  DialogActions,
  DialogTitle,
  DialogContent,
  Paper,
  Dialog,
  TextField,
  Tooltip,
  Button,
  Typography,
  Container,
  Card,
  CardContent,
  Grid,
  CardMedia,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Formik, Field, Form } from "formik";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import NoContent from "./NoContent";

function Content(props) {
  const {
    content,
    isEditDialogOpen,
    editContentData,
    handleDelete,
    handleEditSubmit,
    setEditDialogOpen,
    setEditContentData,
  } = props;

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
                      Uploaded at: {content.uploaded_at ? content.uploaded_at.slice(0, 10) : "Unknown"}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {content.created_at ? `Created at ${content.created_at.slice(0, 10)}` : ""}
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
                      <Button
                        aria-label="edit"
                        onClick={(e) => {
                          e.preventDefault();
                          setEditDialogOpen(true);
                          setEditContentData(content);
                        }}
                      >
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
    <Container component="main" maxWidth="md" sx={{ mt: 5, boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
      <Grid container spacing={3}>
        {contentMap}
      </Grid>
      <Dialog
        open={isEditDialogOpen}
        onClose={() => {
          setEditDialogOpen(false);
          setEditContentData({
            title: "",
            description: "",
            _thumbnail: "",
            url: "",
            _creator: "",
            created_at: null,
            type: "",
          });
        }}
        aria-labelledby="edit-content-dialog-title"
        PaperComponent={Paper}
      >
        <DialogTitle id="edit-content-dialog-title">Edit Content</DialogTitle>
        <Formik initialValues={editContentData} onSubmit={handleEditSubmit} enableReinitialize>
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <DialogContent>
                <Field name="_creator">
                  {({ field, meta }) => (
                    <TextField
                      {...field}
                      fullWidth
                      margin="normal"
                      label="Creator"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      error={meta.touched && !!meta.error}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
                <Field name="title">
                  {({ field, meta }) => (
                    <TextField
                      {...field}
                      fullWidth
                      margin="normal"
                      label="Title"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      error={meta.touched && !!meta.error}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
                <Field name="description">
                  {({ field, meta }) => (
                    <TextField
                      {...field}
                      fullWidth
                      margin="normal"
                      label="Description"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      error={meta.touched && !!meta.error}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
                <Field name="url">
                  {({ field, meta }) => (
                    <TextField
                      {...field}
                      fullWidth
                      margin="normal"
                      label="Video Url"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      error={meta.touched && !!meta.error}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
                <Field name="_thumbnail">
                  {({ field, meta }) => (
                    <TextField
                      {...field}
                      fullWidth
                      margin="normal"
                      label="Thumbnail"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      error={meta.touched && !!meta.error}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
                <Field name="created_at">
                  {({ field, meta }) => {
                    const fieldValue = field.value ? field.value : "";
                    return (
                      <TextField
                        {...field}
                        fullWidth
                        value={fieldValue}
                        margin="normal"
                        type="datetime-local"
                        label="Created At"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        error={meta.touched && !!meta.error}
                        helperText={meta.touched && meta.error}
                        onChange={(e) => {
                          setFieldValue("created_at", e.target.value);
                        }}
                      />
                    );
                  }}
                </Field>
                <Field name="type">
                  {({ field, meta }) => (
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Type</InputLabel>
                      <Select {...field}>
                        <MenuItem value="">Select Type</MenuItem>
                        <MenuItem value="Video">Video</MenuItem>
                        <MenuItem value="Article">Article</MenuItem>
                      </Select>
                      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
                    </FormControl>
                  )}
                </Field>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setEditDialogOpen(false)} color="primary">
                  Close
                </Button>
                <Button type="submit" color="primary" disabled={isSubmitting}>
                  Submit
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </Container>
  ) : (
    <NoContent />
  );
}

export default Content;
