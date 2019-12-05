import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAutoSuggest from "../components/InputAutoSuggest";
import useForm, { FormContext, useFormContext } from "react-hook-form";
import { searchVariation } from "../utils/api";
import Checkbox from "@material-ui/core/Checkbox";
import { strings } from "../assets/strings";

export default function EANForm() {
  const methods = useForm();
  const [suggestions, setSuggestions] = React.useState([]);
  const onSubmit = data => console.log(data);

  const handleOnChange = async e => {
    const variations = await searchVariation(e);

    let cleanedVariations = variations.map(({ product_name, ean }) => {
      return {
        label: product_name,
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
            <Grid item xs={10}>
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
          </Grid>
        </form>
      </FormContext>
    </React.Fragment>
  );
}
