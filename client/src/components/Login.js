import * as React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();
const SignInSchema = Yup.object().shape({
  username: Yup.string().required("Username is required."),
  password: Yup.string().required("Password is required."),
});

export default function SignIn() {
  const [user, setUser] = React.useState(null);
  const [errors, setErrors] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting }) => {
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values, null, 2),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((currentUser) => {
          setUser(currentUser);
          navigate("/");
        });
      } else {
        r.json().then((err) => {
          setErrors(err);
        });
      }
      setSubmitting(false);
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Formik
            initialValues={{
              username: "",
              password: "",
              remember_me: false,
            }}
            validationSchema={SignInSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field name="username">
                  {({ field, meta }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      autoFocus
                      error={meta.touched && !!meta.error}
                      helperText={meta.touched && meta.error}
                      autoComplete="username"
                    />
                  )}
                </Field>
                <Field name="password">
                  {({ field, meta }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      error={meta.touched && !!meta.error}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
                <Field name="remember_me" type="checkbox">
                  {({ field }) => (
                    <FormControlLabel control={<Checkbox {...field} color="primary" />} label="Remember me" />
                  )}
                </Field>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isSubmitting || isLoading}
                >
                  {isLoading ? "Loading..." : "Sign In"}
                </Button>
              </Form>
            )}
          </Formik>
          <Grid container>
            {/* Dont forget to update href for signup */}
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
            <p style={{ color: "red" }}>{errors.message}</p>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
