import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "@material-ui/core";
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
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Divider from "@material-ui/core/Divider";

import FormLabel from "@material-ui/core/FormLabel";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { useFormContext } from "react-hook-form";

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
    flexBasis: "100%",
    width: "100%",
  },
  grid: {
    paddingRight: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      padding: 0,
    },
  },
  radioGrid: {
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      padding: 0,
    },
  },
  row: {
    margin: `${theme.spacing(1)}px 0`,
    alignItems: "flex-end",
  },

  iconWrapper: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    margin: "0 auto",
    maxWidth: "25%",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "100%",
      width: "100%",
      padding: 0,
    },
  },
  icon: {
    color: theme.palette.primary.main,
    marginRight: `${theme.spacing(2)}px`,
  },
  iconInput: {
    width: "100%",
    "& *": {
      maxWidth: "95%",
      width: "100%",
      [theme.breakpoints.down("xs")]: {
        maxWidth: "unset",
      },
    },
  },
  divider: {
    width: "100%",
    marginTop: `${theme.spacing(4)}px`,
    marginBottom: `${theme.spacing(2)}px`,
  },
  radioGroup: {
    flexDirection: "row",
    flexWrap: "nowrap",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
}));

const gridSize = {
  xs: 12,
  sm: 12,
};

function StyledRadio(props) {
  const radioButtonStyles = makeStyles(theme => ({
    root: {
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
    icon: {
      borderRadius: "50%",
      width: 16,
      height: 16,
      boxShadow:
        "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
      backgroundColor: "#f5f8fa",
      backgroundImage:
        "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
      "$root.Mui-focusVisible &": {
        outline: "2px auto rgba(19,124,189,.6)",
        outlineOffset: 2,
      },
      "input:hover ~ &": {
        backgroundColor: "#ebf1f5",
      },
      "input:disabled ~ &": {
        boxShadow: "none",
        background: "rgba(206,217,224,.5)",
      },
    },
    checkedIcon: {
      backgroundColor: theme.palette.primary.main,
      backgroundImage:
        "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
      "&:before": {
        display: "block",
        width: 16,
        height: 16,
        backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
        content: '""',
      },
      "input:hover ~ &": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  }));

  const classes = radioButtonStyles();

  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

export default function Variation(props) {
  const { blockNextStepButton, customProps, customName } = props;
  const { register, setValue } = useFormContext(); // retrieve all hook methods
  const [isMultiplePrice, setIsMultiplePrice] = useState(false);
  const classes = useStyles();

  const pictures = 3;

  const handleShowMultiplePrice = val => {
    if (val !== "pricePerMarket") {
      return setIsMultiplePrice(false);
    }

    setIsMultiplePrice(true);
  };

  return (
    <div className={classes.root}>
      {/* First Row */}
      <Grid container className={classes.row}>
        <Grid item md={3} sm={3} xs={12} className={classes.grid}>
          <TextField
            label="Seu SKU *"
            className={clsx(classes.textField)}
            type="text"
            name="sku"
            inputRef={register({ required: true })}
          />
        </Grid>
        <Grid item md={6} sm={6} xs={12} className={classes.grid}>
          <TextField
            label="Nome do Produto *"
            className={clsx(classes.textField)}
            type="text"
            name="productName"
            inputRef={register({ required: true })}
          />
        </Grid>
        <Grid item md={3} sm={3} xs={12} className={classes.grid}>
          <TextField
            label="EAN"
            className={clsx(classes.textField)}
            type="text"
            name="ean"
            inputRef={register({ required: false })}
          />
        </Grid>
      </Grid>
      {/* Second Row */}
      <Grid container alignItems="flex-end" className={classes.row}>
        <Grid className={(classes.margin, classes.iconWrapper)} md={3} item>
          <Grid item>
            <PhotoCameraIcon className={classes.icon} />
          </Grid>
          <Grid item className={classes.iconInput}>
            <TextField
              id="input-with-icon-grid"
              name="picture1"
              label="Foto 1 *"
              inputRef={register({ required: true })}
            />
          </Grid>
        </Grid>

        {[...Array(pictures).keys()].map((e, i) => {
          const id = i + 2;
          return (
            <Grid
              key={id}
              className={(classes.margin, classes.iconWrapper)}
              md={3}
              item>
              <Grid item>
                <PhotoCameraIcon className={classes.icon} />
              </Grid>
              <Grid item className={classes.iconInput}>
                <TextField
                  id="input-with-icon-grid"
                  name={`picture${id}`}
                  label={`Foto ${id}`}
                  inputRef={register({ required: false })}
                />
              </Grid>
            </Grid>
          );
        })}
      </Grid>
      {/* Third Row
       *
       *
       */}
      <Grid
        container
        className={classes.row}
        style={{ alignItems: "flex-start" }}>
        <Grid item md={3} sm={3} xs={12} className={classes.grid}>
          <TextField
            label="Quantidade *"
            className={clsx(classes.textField)}
            type="text"
            name="quantity"
            inputRef={register({ required: true })}
            inputProps={{
              min: "0",
            }}
          />
        </Grid>
        <Grid
          item
          md={8}
          sm={8}
          xs={12}
          className={(classes.grid, classes.radioGrid)}>
          <RadioGroup
            style={{ alignItems: "flex-start" }}
            defaultValue="priceUnique"
            aria-label="price"
            name="price-radios"
            className={classes.radioGroup}
            onChange={e => handleShowMultiplePrice(e.target.value)}>
            <Grid
              md={4}
              sm={4}
              xs={12}
              style={{
                display: "flex",
                flexDirection: "column",
              }}>
              <FormControlLabel
                value="priceUnique"
                control={<StyledRadio />}
                label="Preço Único"
              />
              <div
                style={{
                  visibility: isMultiplePrice ? "hidden" : "visible",
                }}>
                <TextField
                  label="Preço Único"
                  className={clsx(classes.textField)}
                  type="text"
                  name="price"
                  inputRef={register({ required: true })}
                  inputProps={{
                    min: "0",
                  }}
                />
              </div>
            </Grid>

            <Grid md={4} sm={4} xs={12}>
              <FormControlLabel
                value="pricePerMarket"
                control={<StyledRadio />}
                label="Preço por Market Place"
              />

              <div
                style={{
                  visibility: isMultiplePrice ? "visible" : "hidden",
                }}>
                <TextField
                  label="Mercado Livre"
                  className={clsx(classes.textField)}
                  type="text"
                  name="priceUniqueMercadoLivre"
                  inputRef={register({ required: true })}
                  inputProps={{
                    min: "0",
                  }}
                />
                <TextField
                  label="Submarino"
                  className={clsx(classes.textField)}
                  type="text"
                  name="priceUniqueSubmarino"
                  inputRef={register({ required: true })}
                  inputProps={{
                    min: "0",
                  }}
                />
              </div>
            </Grid>
          </RadioGroup>
        </Grid>
      </Grid>
      <Grid xs={12}>
        <Button
          size="medium"
          variant="contained"
          color="secondary"
          className={classes.button}
          style={{ float: "right" }}>
          <DeleteIcon fontSize="small" />
        </Button>
      </Grid>
      <Divider className={classes.divider} />
    </div>
  );
}
