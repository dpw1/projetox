import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import FavoriteIcon from "@material-ui/icons/Favorite";
import NavigationIcon from "@material-ui/icons/Navigation";
import Variation from "./Variation";
import uuid from "uuid";
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
  const [variations, setVariations] = useState([
    {
      id: 123,
    },
    {
      id: 1,
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
      <Variation disabled={true} />
      {variations.map((e, i) => (
        <Variation key={e.id} id={e.id} handleDelete={handleDelete} />
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
