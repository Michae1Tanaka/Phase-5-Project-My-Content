import * as React from "react";
import { Formik, Field, Form } from "formik";
import { string, object } from "yup";
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
import { useNavigate, useMatch } from "react-router-dom";
import { UserContext } from "../context/UserContextProvider";

const defaultTheme = createTheme();

const SignInSchema = object().shape({
  username: string().required("Username is required."),
  password: string().required("Password is required."),
});

const signUpSchema = object().shape({
  username: string()
    .required("Username is required.")
    .min(3, "Usernames must be a minimum of 3 characters.")
    .max(15, "Usernames cannot be more than 15 characters."),
  password: string().required("Password is required.").min(8, "Passwords must be a minimum of 8 characters."),
});

function SignUpLogIn() {
  const { setUser, errors, setErrors, isLoading, setIsLoading } = React.useContext(UserContext);
  const navigate = useNavigate();

  const isLogin = useMatch("/login");

  const handleSubmit = (values, { setSubmitting }) => {
    const endpoint = isLogin ? "/login" : "/account";

    setIsLoading(true);

    fetch(endpoint, {
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

  function signUpOrLogInLink() {
    if (isLogin) {
      return (
        <Link href="/signup" variant="body2" color="primary">
          {"Don't have an account? Sign Up"}
        </Link>
      );
    } else {
      return (
        <Link href="/login" variant="body2" color="secondary">
          {"Already have an account? Sign In"}
        </Link>
      );
    }
  }

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
          <Avatar sx={{ m: 1, bgcolor: isLogin ? "primary.main" : "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isLogin ? "Sign In" : "Sign Up"}
          </Typography>
          <Formik
            initialValues={{
              username: "",
              password: "",
              remember_me: false,
            }}
            validationSchema={isLogin ? SignInSchema : signUpSchema}
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
                      color={isLogin ? "primary" : "secondary"}
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
                      color={isLogin ? "primary" : "secondary"}
                    />
                  )}
                </Field>
                <Field name="remember_me" type="checkbox">
                  {({ field }) => (
                    <FormControlLabel
                      control={<Checkbox {...field} color={isLogin ? "primary" : "secondary"} />}
                      label="Remember me"
                    />
                  )}
                </Field>
                <Button
                  color={isLogin ? "primary" : "secondary"}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isSubmitting || isLoading}
                >
                  {isLoading ? "Loading..." : isLogin ? "Sign In" : "Sign Up"}
                </Button>
              </Form>
            )}
          </Formik>
          <Grid container>
            {signUpOrLogInLink()}
            <p style={{ color: "red" }}>{errors.message}</p>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUpLogIn;
