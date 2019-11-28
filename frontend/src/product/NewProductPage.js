import React, { useState } from "react";
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
import Review from "./Review";
import Sidebar from "../components/Sidebar";
import Copyright from "../components/Copyright";
import Badge from "@material-ui/core/Badge";
import CategoryForm from "./CategoryForm";
import DataForm from "./DataForm";
import Variation from "./Variation";
import useForm, { FormContext } from "react-hook-form";
import VariationForm from "./VariationForm";
import uuid from "uuid";

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
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
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
  //   console.log(formData);
  // }, [formData]);

  // useEffect(() => {
  //   console.log("errors", methods.errors);
  // }, [methods.errors]);

  const onSubmit = data => {
    console.log("submit", processData(data));
  };

  const processData = data => {
    const processedData = { variants: [] };

    for (const key in data) {
      if (key.includes("id_")) {
        const [_, index, subkey] = key.match(/^id_(\d+)-(\w+)$/);

        if (!processedData.variants[index]) {
          processedData.variants[index] = {};
        }

        processedData.variants[index][subkey] = data[key];
      } else {
        processedData[key] = data[key];
      }
    }

    return processedData;
  };

  const handleNext = async () => {
    /**
     * TODO:
     * 1. formulate how json will be;
     * 2. clean up data for the Variations, they should be in specific arrays
     */

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
    setActiveStep(activeStep - 1);
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
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
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
