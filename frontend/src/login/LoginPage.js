import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import useForm from "react-hook-form";
import { isEmail } from "validator";

import Copyright from "../components/Copyright";
import { login } from "../utils/api";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    animation: "unset",
    marginTop: 2
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  buttonWrapper: {
    position: "relative"
  }
}));

export default function LoginPage() {
  const classes = useStyles();
  const { register, handleSubmit, errors, setError, clearError } = useForm(); // initialise the hook
  const [loading, setLoading] = useState(false);

  const onSubmitLogin = async data => {
    setLoading(true);
    console.log(loading);
    const result = await login(data);
    await setLoading(false);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmitLogin)}>
          <TextField
            variant="outlined"
            margin="normal"
            error={!!errors.email}
            helperText={errors.email && errors.email.message}
            fullWidth
            label="E-mail"
            name="email"
            autoComplete="email"
            inputRef={register({ required: true })}
            onBlur={e => {
              const value = e.target.value;

              if (!isEmail(value) && value.length > 0) {
                return setError(
                  "email",
                  "invalidEmail",
                  "Por favor use um e-mail válido."
                );
              }

              clearError("email");
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            error={errors.password}
            helperText="Por favor digite a password."
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            inputRef={register({ required: true })}
            autoComplete="current-password"
          />
          {errors.password && "Senha is required."}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Lembrar"
          />
          <div className={classes.buttonWrapper}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              className={classes.submit}
            >
              Efectue o seu login
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Recuperar password
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Criar uma conta"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
