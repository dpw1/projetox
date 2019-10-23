import React from "react";
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
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import FormLabel from "@material-ui/core/FormLabel";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { useFormContext } from "react-hook-form";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing(1)
  },
  withoutLabel: {
    marginTop: theme.spacing(3)
  },
  textField: {
    flexBasis: "100%",
    width: "100%"
  },
  grid: {
    paddingRight: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      padding: 0
    }
  },
  row: {
    margin: `${theme.spacing(1)}px 0`,
    alignItems: "flex-end"
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
      padding: 0
    }
  },
  icon: {
    color: theme.palette.primary.main,
    marginRight: `${theme.spacing(2)}px`
  },
  iconInput: {
    width: "100%",
    "& *": {
      maxWidth: "95%",
      width: "100%",
      [theme.breakpoints.down("xs")]: {
        maxWidth: "unset"
      }
    }
  },
  radioGroup: {
    flexDirection: "row",
    flexWrap: "nowrap"
  }
}));

const gridSize = {
  xs: 12,
  sm: 12
};

function StyledRadio(props) {
  const radioButtonStyles = makeStyles({
    root: {
      "&:hover": {
        backgroundColor: "transparent"
      }
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
        outlineOffset: 2
      },
      "input:hover ~ &": {
        backgroundColor: "#ebf1f5"
      },
      "input:disabled ~ &": {
        boxShadow: "none",
        background: "rgba(206,217,224,.5)"
      }
    },
    checkedIcon: {
      backgroundColor: "#137cbd",
      backgroundImage:
        "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
      "&:before": {
        display: "block",
        width: 16,
        height: 16,
        backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
        content: '""'
      },
      "input:hover ~ &": {
        backgroundColor: "#106ba3"
      }
    }
  });

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

export default function VariationsForm(props) {
  const { blockNextStepButton, customProps, customName } = props;
  const { register, setValue } = useFormContext(); // retrieve all hook methods
  const classes = useStyles();

  const pictures = 3;

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
              item
            >
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
      {/* Third Row */}
      <Grid container className={classes.row}>
        <Grid item md={3} sm={3} xs={12} className={classes.grid}>
          <TextField
            label="Quantidade *"
            className={clsx(classes.textField)}
            type="text"
            name="quantity"
            inputRef={register({ required: true })}
            inputProps={{
              min: "0"
            }}
          />
        </Grid>
        <Grid item md={9} sm={9} xs={12} className={classes.grid}>
          <RadioGroup
            defaultValue="priceUnique"
            aria-label="price"
            name="price-radios"
            className={classes.radioGroup}
            onChange={() => console.log("chjanege")}
          >
            <FormControlLabel
              value="priceUnique"
              control={<StyledRadio />}
              label="Preço Único"
            />
            <FormControlLabel
              value="pricePerMarket"
              control={<StyledRadio />}
              label="Preço por Market Place"
            />
          </RadioGroup>
        </Grid>
      </Grid>
    </div>
  );
}
