import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import Sidebar from "../components/Sidebar";
import Copyright from "../components/Copyright";
import { withRouter } from "react-router-dom";
import { URLS } from "../assets/urls";

import EANForm from "./EANForm";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  main: {
    display: "flex",
    height: "100vh"
  },
  layout: {
    width: "auto",
    marginTop: "10vh",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}));

const NewEANPage = props => {
  const classes = useStyles();

  return (
    <main className={classes.main}>
      <Sidebar></Sidebar>
      <div className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            EAN
          </Typography>
          <React.Fragment>
            <EANForm></EANForm>
            <Link
              href="#"
              onClick={e => {
                e.preventDefault();
                props.history.push(URLS.newProduct);
              }}
              style={{
                margin: "0 auto",
                display: "table",
                textAlign: "center"
              }}
            >
              Não encontrei, quero cadastrar um novo produto
            </Link>
          </React.Fragment>
        </Paper>
        <Copyright />
      </div>
    </main>
  );
};

export default withRouter(NewEANPage);
