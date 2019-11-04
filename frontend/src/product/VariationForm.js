import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import FavoriteIcon from "@material-ui/icons/Favorite";
import NavigationIcon from "@material-ui/icons/Navigation";
import Variation from "./Variation";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function FloatingActionButtons() {
  const classes = useStyles();
  const [variations, setVariations] = useState(0);

  const handleCreateVariation = () => {
    setVariations(variations + 1);
  };

  return (
    <div>
      <Variation />
      {[...Array(variations).keys()].map((e, i) => (
        <Variation />
      ))}
      <Button
        onClick={handleCreateVariation}
        variant="contained"
        color="primary"
        className={classes.button}>
        <AddIcon />
        Nova Variação
      </Button>
    </div>
  );
}
