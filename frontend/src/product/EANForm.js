import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAutoSuggest from "../components/InputAutoSuggest";
import useForm, { FormContext, useFormContext } from "react-hook-form";
import CircularProgress from "@material-ui/core/CircularProgress";
import { searchVariation } from "../utils/api";
import Checkbox from "@material-ui/core/Checkbox";
import { strings } from "../assets/strings";
import { createUserProduct, getProductByEAN } from "../utils/api";

export default function EANForm() {
  const methods = useForm();
  const [suggestions, setSuggestions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async ean => {
    const product = await getProductByEAN(Object.values(ean));

    try {
      await createUserProduct(product[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnChange = async e => {
    setLoading(true);
    const variations = await searchVariation(e);
    setLoading(false);
    console.log(variations);

    let cleanedVariations = variations.map(({ name, ean }) => {
      return {
        label: name,
        ean,
      };
    });

    setSuggestions(cleanedVariations);
  };

  return (
    <React.Fragment>
      <Typography
        variant="h6"
        gutterBottom
        style={{ margin: "20px 0", textAlign: "center" }}>
        Cadastrar produto por EAN
      </Typography>

      <FormContext {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={10} style={{ position: "relative" }}>
              {loading && (
                <div style={{ position: "absolute", right: 30, top: 26 }}>
                  <CircularProgress size={24} />
                </div>
              )}
              <InputAutoSuggest
                label="EAN"
                id="EANInput"
                customName="EAN"
                customProps={{ required: true }}
                placeholder="Digite o EAN do seu produto"
                customOnChange={handleOnChange}
                suggestions={suggestions}
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton type="submit" aria-label="search" color="primary">
                <SearchIcon />
              </IconButton>
            </Grid>
            <Grid item xs={12} />
          </Grid>
        </form>
      </FormContext>
    </React.Fragment>
  );
}
