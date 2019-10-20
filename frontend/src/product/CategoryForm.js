import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import SimpleList from "../components/SimpleList";
import axios from "axios";
import { getNodeById } from "../utils/frontend";

import {
  productCategories,
  productCategoriesFlores,
  productCategoriesGiftCards
} from "../assets/dummydata";

const productFloresURL = "https://api.jsonbin.io/b/5dabbb03eb13b2547d2bb9e2";
const gridSize = {
  sm: 12,
  md: 3,
  lg: 3
};
export default function CategoryForm() {
  const [item, setItem] = useState({});
  const [itemChildren, setItemChildren] = useState({});

  const getProductCategories = id => {
    if (id === "1") {
      return productCategoriesGiftCards;
    } else if (id === "2") {
      return productCategoriesFlores;
    }

    return undefined;
  };

  const updateCurrentItem = currentItem => {
    setItem(currentItem);
  };

  const GenerateChildrenList = data => {
    return <React.Fragment></React.Fragment>;
  };

  useEffect(() => {
    const populateTablesWithChildren = () => {
      if (!item.id) return;

      const addChildrenToTable = children => {
        if (!children) return;
        const tableId = [...children[0].id].filter(e => e === "_").length;

        if (tableId === 1) {
          setItemChildren({
            first: children,
            second: [],
            third: []
          });
        }

        if (tableId === 2) {
          setItemChildren({
            ...itemChildren,
            second: children,
            third: []
          });
        }

        if (tableId === 3) {
          setItemChildren({
            ...itemChildren,
            third: children
          });
        }
      };

      let productCategory = getProductCategories(item.id[0]);
      let list = getNodeById(item.id, productCategory);

      console.log(productCategory, list);
      addChildrenToTable(list.children);
    };

    populateTablesWithChildren();
  }, [item]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom align="center">
        Aonde aparecerá em nosso site?
      </Typography>
      <Grid container spacing={1}>
        <Grid item {...gridSize}>
          <SimpleList
            items={[...productCategories]}
            updateCurrentItem={updateCurrentItem}
          ></SimpleList>
        </Grid>
        <Grid item {...gridSize}>
          <SimpleList
            items={itemChildren.first ? itemChildren.first : null}
            updateCurrentItem={updateCurrentItem}
          ></SimpleList>
        </Grid>
        <Grid item {...gridSize}>
          <SimpleList
            items={itemChildren.second ? itemChildren.second : null}
            updateCurrentItem={updateCurrentItem}
          ></SimpleList>
        </Grid>
        <Grid item {...gridSize}>
          <SimpleList
            items={itemChildren.third ? itemChildren.third : null}
            updateCurrentItem={updateCurrentItem}
          ></SimpleList>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
