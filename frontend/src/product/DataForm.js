import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Grid from "@material-ui/core/Grid";
import { useFormContext } from "react-hook-form";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    flexBasis: 200,

    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginLeft: 0,
    },
  },
  title: {
    padding: `${theme.spacing(3)}px 0`,
  },
}));

const gridSize = {
  xs: 12,
  sm: 3,
  md: 3,
  lg: 3,
};

export default function DataForm(props) {
  const { blockNextStepButton, customName } = props;
  const { register, errors, setValue, setError, clearError } = useFormContext(); // retrieve all hook methods
  const classes = useStyles();

  // const blockButton = (() => {
  //   blockNextStepButton(true);
  // })();

  // useEffect(() => {
  //   console.log(errors);
  // }, [errors]);

  return (
    <div className={classes.root}>
      <Grid item xs={12}>
        <Typography
          variant="h5"
          gutterBottom
          align="center"
          className={classes.title}>
          Dados para cálculo do frete
        </Typography>
      </Grid>
      <Grid item {...gridSize}>
        <TextField
          label="Altura *"
          className={clsx(classes.margin, classes.textField)}
          type="number"
          name="height"
          InputProps={{
            startAdornment: <InputAdornment position="start">m</InputAdornment>,
          }}
          inputProps={{
            min: "0",
          }}
          inputRef={register({ required: "Por favor digite uma altura." })}
          error={!!errors.height}
          helperText={errors.height && errors.height.message}
          defaultValue="1"
        />
        {errors.height && errors.height.message}
      </Grid>
      <Grid item {...gridSize}>
        <TextField
          label="Largura *"
          className={clsx(classes.margin, classes.textField)}
          type="number"
          name="width"
          InputProps={{
            startAdornment: <InputAdornment position="start">m</InputAdornment>,
          }}
          error={!!errors.width}
          helperText={errors.width && errors.width.message}
          inputRef={register({ required: true })}
          defaultValue="1"
        />
      </Grid>
      <Grid item {...gridSize}>
        <TextField
          label="Comprimento *"
          className={clsx(classes.margin, classes.textField)}
          type="number"
          name="length"
          InputProps={{
            startAdornment: <InputAdornment position="start">m</InputAdornment>,
          }}
          inputRef={register({ required: true })}
          defaultValue="1"
        />
      </Grid>
      <Grid item {...gridSize}>
        <TextField
          label="Peso *"
          className={clsx(classes.margin, classes.textField)}
          type="number"
          name="weight"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">Kg</InputAdornment>
            ),
          }}
          inputRef={register({ required: true })}
          defaultValue="1"
        />
      </Grid>
    </div>
  );
}
