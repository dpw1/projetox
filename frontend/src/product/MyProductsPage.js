import React, { useState, useEffect } from "react";
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
import { formatMoney } from "../utils/helpers";
import { getUserProducts } from "../utils/api";

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
  const [userProducts, setUserProducts] = useState([]);

  useEffect(() => {
    const userProducts = (async () => {
      const products = await getUserProducts();
      setUserProducts(products);
    })();
  }, []);

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
            title="Produtos"
            headCells={[
              {
                id: "sku",
                numeric: false,
                disablePadding: true,
                label: "Seu SKU",
              },
              {
                id: "id",
                numeric: true,
                disablePadding: false,
                label: "ID",
              },
              {
                id: "name",
                numeric: true,
                disablePadding: false,
                label: "Nome",
              },
              {
                id: "varations",
                numeric: true,
                disablePadding: false,
                label: "Variantes",
              },
              {
                id: "available",
                numeric: true,
                disablePadding: false,
                label: "Publicado",
              },
              {
                id: "quantity",
                numeric: true,
                disablePadding: false,
                label: "Estoque [disponível]",
              },
              {
                id: "price",
                numeric: true,
                disablePadding: false,
                label: "Preço",
              },
            ]}
            rowsData={[
              {
                sku: "12914",
                id: "305",
                name:
                  "Esponja Mini Elétrica Massageadora Para Limpeza Facial Pink",
                variations: 1,
                available: "Sim",
                quantity: 40,
                price: formatMoney(100),
              },
            ]}
          />
          <Copyright />
        </Container>
      </main>
    </div>
  );
}
