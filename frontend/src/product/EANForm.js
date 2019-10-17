import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CustomFormSelect from "../components/CustomFormSelect";
import useForm, { FormContext, useFormContext } from "react-hook-form";
import Checkbox from "@material-ui/core/Checkbox";
import { strings } from "../assets/strings";

export default function EANForm() {
  const methods = useForm();
  const onSubmit = data => console.log(data);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Cadastrar produto por EAN
      </Typography>

      <Grid container spacing={3}>
        <FormContext {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Grid item xs={10}>
              <CustomFormSelect
                label="EAN"
                id="EANInput"
                customName="EAN"
                placeholder="Digite o EAN do seu produto"
                suggestions={[
                  { label: "123" },
                  { label: "990" },
                  { label: "007" }
                ]}
              ></CustomFormSelect>
            </Grid>
            <Grid item xs={2}>
              <IconButton type="submit" aria-label="search" color="primary">
                <SearchIcon />
              </IconButton>
            </Grid>
          </form>
        </FormContext>
      </Grid>
    </React.Fragment>
  );
}
