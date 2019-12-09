import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import CustomTable from "../components/CustomTable";
import Sidebar from "../components/Sidebar";
import Copyright from "../components/Copyright";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    paddingTop: 32,
    paddingBottom: 32,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  title: {
    padding: `${theme.spacing(3)}px 0`,
  },
}));

export default function MyProductsPage() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Sidebar />
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            className={classes.title}>
            Meus Produtos
          </Typography>
          <CustomTable
            rowsData={[
              {
                name: "Cupcake (from props)",
                calories: 305,
                fat: 3.7,
                carbs: 67,
                protein: 4.3,
              },
              {
                name: "Ice-Cream",
                calories: 305,
                fat: 3.7,
                carbs: 67,
                protein: 4.3,
              },
              {
                name: "Cookies",
                calories: 305,
                fat: 3.7,
                carbs: 67,
                protein: 4.3,
              },
              {
                name: "Lasagna",
                calories: 305,
                fat: 3.7,
                carbs: 67,
                protein: 4.3,
              },
              {
                name: "Strogonoff",
                calories: 305,
                fat: 3.7,
                carbs: 67,
                protein: 4.3,
              },
              {
                name: "Barbecue",
                calories: 305,
                fat: 3.7,
                carbs: 67,
                protein: 4.3,
              },
              {
                name: "Burger",
                calories: 305,
                fat: 3.7,
                carbs: 67,
                protein: 4.3,
              },
              {
                name: "Pizza",
                calories: 305,
                fat: 3.7,
                carbs: 67,
                protein: 4.3,
              },
            ]}
          />
          <Copyright />
        </Container>
      </main>
    </div>
  );
}
