import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import FavoriteIcon from "@material-ui/icons/Favorite";
import NavigationIcon from "@material-ui/icons/Navigation";
import Variation from "./Variation";
import uuid from "uuid";
import { Button, Typography, Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  title: {
    padding: `${theme.spacing(3)}px 0`,
  },
}));

export default function FloatingActionButtons() {
  const classes = useStyles();
  const [variations, setVariations] = useState([
    {
      id: uuid(),
    },
  ]);

  const handleCreate = () => {
    setVariations([
      ...variations,
      {
        id: uuid(),
      },
    ]);
  };

  const handleDelete = id => {
    var newVariations = variations.filter(e => e.id !== id);
    setVariations(newVariations);
  };

  return (
    <div>
      <Grid item xs={12}>
        <Typography
          variant="h5"
          gutterBottom
          align="center"
          className={classes.title}>
          Variações do produto
        </Typography>
      </Grid>
      {variations.map((e, i) => (
        <Variation
          key={e.id}
          id={e.id}
          formId={`id_${i}`}
          handleDelete={handleDelete}
          disabled={i === 0 ? true : false}
        />
      ))}
      <Button
        onClick={handleCreate}
        variant="contained"
        color="primary"
        className={classes.button}>
        <AddIcon />
        Nova Variação
      </Button>
    </div>
  );
}
