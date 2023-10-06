import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Container,
  Box,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { UserContext } from "../context/UserContextProvider";
import { Formik, Form, Field } from "formik";
import { string, object } from "yup";

function Profile() {
  const { user, isLoading, setUser } = useContext(UserContext);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const navigate = useNavigate();

  const updateProfileSchema = object().shape({
    username: string()
      .required("Username is required.")
      .min(3, "Usernames must be a minimum of 3 characters.")
      .max(15, "Usernames cannot be more than 15 characters."),
    password: string().required("Password is required.").min(8, "Passwords must be a minimum of 8 characters."),
  });

  async function handleUpdateAccount(values, formikBag) {
    try {
      const res = await fetch("/account", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        const updatedUser = await res.json();
        setUser(updatedUser);
        formikBag.resetForm();
      } else {
        const errorData = await res.json();
        console.error("Error while updating account", errorData.message);
      }
    } catch (err) {
      console.error("Error: ", err);
    }
  }

  async function handleDeleteAccount() {
    try {
      const res = await fetch("/account", {
        method: "DELETE",
      });
      if (res.ok) {
        const data = await res.json();
        setDeleteDialogOpen(false);
        setUser(null);
        navigate("/login");
      } else {
        const errorData = await res.json();
        console.error("Error while deleting account.", errorData.message);
      }
    } catch (err) {
      console.error("Error: ", err);
    }
  }

  return (
    <Container component="main" sx={{ mt: 10 }}>
      <Card>
        <CardContent>
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={updateProfileSchema}
            onSubmit={(values, formikBag) => handleUpdateAccount(values, formikBag)}
          >
            {({ submitForm }) => (
              <>
                <Form>
                  <Box mt={2}>
                    <Typography>
                      <strong>Username:</strong>{" "}
                      {user ? (
                        <Field
                          name="username"
                          autoComplete="off"
                          type="text"
                          placeholder={isLoading ? "" : user.username}
                        />
                      ) : null}
                    </Typography>
                    <Typography>
                      <strong>Password:</strong> <Field name="password" type="password" placeholder="******" />
                    </Typography>
                  </Box>
                  <Box mt={2}></Box>
                </Form>
                <Box mt={2} display="flex" justifyContent="space-between">
                  <Button variant="contained" color="primary" onClick={submitForm}>
                    Save
                  </Button>
                  <Button variant="contained" color="primary" onClick={() => setDeleteDialogOpen(true)}>
                    Delete Account
                  </Button>
                </Box>
              </>
            )}
          </Formik>
        </CardContent>
      </Card>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete your account? This action cannot be undone. Your account and all content
            saved will be deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteAccount} color="primary" autoFocus>
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Profile;
