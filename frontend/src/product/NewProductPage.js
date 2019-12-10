import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Review from "./Review";
import Sidebar from "../components/Sidebar";
import Copyright from "../components/Copyright";
import Badge from "@material-ui/core/Badge";
import CategoryForm from "./CategoryForm";
import DataForm from "./DataForm";
import Variation from "./Variation";
import useForm, { FormContext } from "react-hook-form";
import VariationForm from "./VariationForm";
import { URLS } from "../assets/urls";
import { renameProperty } from "../utils/helpers";
import uuid from "uuid";
import { getUserData, createProduct, createUserProduct } from "../utils/api";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative",
  },
  main: {
    display: "flex",
  },
  layout: {
    width: "auto",
    marginTop: "10vh",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 1200,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    "&:nth-child(1)": {
      marginLeft: 0,
      paddingLeft: 0,
    },
  },
  title: {
    padding: `${theme.spacing(3)}px 0`,
  },
}));

const steps = ["Categoria", "Dados", "Variações"];

export default function NewProductPage() {
  const classes = useStyles();
  const [formData, setFormData] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [blockNextStepButton, setBlockNextStepButton] = useState(false);
  const methods = useForm();

  // useEffect(() => {
  //   console.log("errors", methods.errors);
  // }, [methods.errors]);

  const onSubmit = async data => {
    const { data: user } = await getUserData();

    let rawProduct = processData(data);
    let product = processData(data);

    const cleanProductData = rawData => {
      const cleanedData = { ...rawData };
      renameProperty(cleanedData, "productName", "name");
      cleanedData.created_by = user.pk;
      cleanedData.category = "1_1_1_1";
      cleanedData.description = "12312123";
      cleanedData.variations.map(e => {
        e.picture = null;
        delete e.price;
        delete e.price_submarino;
        delete e.price_mercado_livre;
        delete e.quantity;
      });

      return cleanedData;
    };

    const cleanUserProductData = createdProduct => {
      const { variations: rawVariations } = rawProduct;
      let userProducts = [];

      createdProduct.variations.map((each, index) => {
        const userProduct = {
          user: createdProduct.created_by,
          product: createdProduct.id,
          variation: each.id,
          quantity: rawVariations[index].quantity,
          price: parseInt(rawVariations[index].price || 0),
          price_mercado_livre: parseInt(
            rawVariations[index].price_mercado_livre || 0,
          ),
          price_submarino: parseInt(rawVariations[index].price_submarino || 0),
          available: true,
        };

        userProducts.push(userProduct);
      });

      return userProducts;
    };

    (async () => {
      const { data: createdProduct } = await createProduct(
        cleanProductData(product),
      );

      const { data: createdUserProduct } = await createUserProduct(
        cleanUserProductData(createdProduct),
      );

      console.log(createdUserProduct);
    })();
  };

  const processData = data => {
    const processedData = { variations: [] };

    for (const key in data) {
      if (key.includes("id_")) {
        const [_, index, subkey] = key.match(/^id_(\d+)-(\w+)$/);

        if (!processedData.variations[index]) {
          processedData.variations[index] = {};
        }

        processedData.variations[index][subkey] = data[key];
      } else {
        processedData[key] = data[key];
      }
    }

    return processedData;
  };

  const handleNext = async () => {
    setFormData(prevState => {
      return processData({ ...prevState, ...methods.getValues() });
    });

    await methods.triggerValidation();
    const errors = methods.errors;
    console.log("errors", errors);

    if (errors.length > 0) return;
    if (activeStep >= 2) return;
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    // setActiveStep(activeStep - 1);
  };

  const handleBlockNextStepButton = value => {
    setBlockNextStepButton(value);
  };

  const getStepContent = step => {
    // step = 2;
    switch (step) {
      case 0:
        return (
          <CategoryForm
            customName="category"
            customProps={{ required: true }}
            blockNextStepButton={handleBlockNextStepButton}
          />
        );
      case 1:
        return <DataForm blockNextStepButton={handleBlockNextStepButton} />;
      case 2:
        return <VariationForm />;
      default:
        throw new Error("Unknown step");
    }
  };

  return (
    <main className={classes.main}>
      <Sidebar />
      <div className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            className={classes.title}>
            Novo Produto
          </Typography>
          {/* <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper> */}
          <React.Fragment>
            <FormContext {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                {/* {getStepContent(activeStep)} */}

                <CategoryForm
                  customName="category"
                  customProps={{ required: true }}
                  blockNextStepButton={handleBlockNextStepButton}
                />
                <DataForm
                  customProps={{ required: true }}
                  blockNextStepButton={handleBlockNextStepButton}
                />
                <VariationForm />

                <div className={classes.buttons}>
                  {/* {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Voltar
                    </Button>
                  )} */}
                  <Button
                    component={Link}
                    to={URLS.dashboard}
                    color="primary"
                    className={classes.button}>
                    Voltar sem cadastrar
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    // disabled={blockNextStepButton}
                    className={classes.button}
                    type={"submit"}>
                    {/* {activeStep === steps.length - 1 ? "Cadastrar" : "Próximo"} */}
                    Cadastrar
                  </Button>
                </div>
              </form>
            </FormContext>
          </React.Fragment>
        </Paper>
        <Copyright />
      </div>
    </main>
  );
}
