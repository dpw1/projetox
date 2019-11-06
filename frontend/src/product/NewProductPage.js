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
import Badge from "@material-ui/core/Badge";
import CategoryForm from "./CategoryForm";
import DataForm from "./DataForm";
import Variation from "./Variation";
import useForm, { FormContext } from "react-hook-form";
import VariationForm from "./VariationForm";

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
}));

const steps = ["Categoria", "Dados", "Variações"];

export default function NewProductPage() {
  const classes = useStyles();
  const [formData, setFormData] = React.useState({});
  const [activeStep, setActiveStep] = React.useState(0);
  const [blockNextStepButton, setBlockNextStepButton] = React.useState(false);
  const methods = useForm();

  const onSubmit = () => {
    // const { category } = data;
    console.log("submit");
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);

    const data = methods.getValues();
    console.log(data);
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
        return (
          <DataForm
            customProps={{ required: true }}
            blockNextStepButton={handleBlockNextStepButton}
          />
        );
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
          <Typography component="h1" variant="h4" align="center">
            Novo Produto
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <React.Fragment>
            <FormContext {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Voltar
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    disabled={blockNextStepButton}
                    className={classes.button}
                    type={"button"}>
                    {activeStep === steps.length - 1 ? "Cadastrar" : "Próximo"}
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
