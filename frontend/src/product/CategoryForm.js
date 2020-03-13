import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import SimpleList from "../components/SimpleList";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { getNodeById } from "../utils/helpers";
import { useFormContext } from "react-hook-form";
import InputMask from "react-input-mask";
import { getMeliProductCategories } from "../utils/api";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

import {
  productCategories,
  productCategoriesFlores,
  productCategoriesGiftCards,
} from "../assets/dummydata";

const useStyles = makeStyles(theme => ({
  title: {
    paddingBottom: `${theme.spacing(3)}px`,
  },
}));

const gridSize = {
  xs: 12,
  sm: 12,
  md: 3,
  lg: 3,
};
export default function CategoryForm(props) {
  const classes = useStyles();
  const [currentCategory, setCurrentCategory] = useState({
    path_from_root: [],
    children_categories: [],
  });
  const [item, setItem] = useState({});
  const [itemChildren, setItemChildren] = useState({});
  const { blockNextStepButton, customProps, customName } = props;
  const {
    register,
    setValue,
    setError,
    errors,
    clearError,
    triggerValidation,
  } = useFormContext(); // retrieve all hook methods

  useEffect(() => {
    (async () => {
      resetListItems();
      // console.log(categories);
    })();
  }, []);

  const handleListClick = async (index, el) => {
    const { id } = el;
    await updateListItems(id);
  };

  const resetListItems = async () => {
    const categories = await getMeliProductCategories();
    setCurrentCategory({
      path_from_root: [],
      children_categories: categories,
    });
  };

  const updateListItems = async id => {
    const categories = await getMeliProductCategories(id);

    if (!categories.children_categories) {
      return;
    }

    setCurrentCategory({
      path_from_root: categories.path_from_root || [],
      children_categories: categories.children_categories,
    });
  };

  const handleBreadcrumbClick = async el => {
    const { id } = el;
    await updateListItems(id);
  };

  // const getProductCategories = async id => {
  //   // const categories = await getMeliProductCategories();
  //   if (id === "1") {
  //     return productCategoriesGiftCards;
  //   } else if (id === "2") {
  //     return productCategoriesFlores;
  //   }

  //   // console.log(categories, "categories");

  //   return undefined;
  // };

  const updateCurrentItem = chosenItem => {
    const { id } = chosenItem;
    // let val = e.target.dataset.pg;
    // console.log(chosenItem, "val: " + val);
    setItem(chosenItem);
  };

  const currentTableUserIsOn = id =>
    id ? [...id].filter(e => e === "_").length : undefined;

  // useEffect(() => {
  //   const addDataToForm = id => {
  //     register({ name: customName, type: `custom-${customName}` }, customProps);
  //     setValue(customName, id);
  //   };

  //   const populateListsWithChildren = () => {
  //     if (!item.id) return;

  //     const addChildrenToTable = children => {
  //       if (!children) return;
  //       const tableId = currentTableUserIsOn(children[0].id);

  //       if (tableId === 1) {
  //         setItemChildren({
  //           first: children,
  //           second: null,
  //           third: null,
  //         });
  //       }

  //       if (tableId === 2) {
  //         setItemChildren({
  //           ...itemChildren,
  //           second: children,
  //           third: null,
  //         });
  //       }

  //       if (tableId === 3) {
  //         setItemChildren({
  //           ...itemChildren,
  //           third: children,
  //         });
  //       }
  //     };

  //     let productCategory = getProductCategories(item.id[0]);

  //     let list = getNodeById(item.id, productCategory);

  //     addChildrenToTable(list.children);

  //     if (currentTableUserIsOn(item.id) === 3) {
  //       addDataToForm(item.id);
  //     }
  //   };

  //   // populateListsWithChildren();
  //   // blockNextStepButton(currentTableUserIsOn(item.id) !== 3);

  //   if (currentTableUserIsOn(item.id) !== 3) {
  //     setError("category", "required", "Por favor escolha uma categoria.");
  //   }
  // }, [item]); // eslint-disable-line

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom align="center">
        Qual produto você deseja vender?
      </Typography>
      <Typography variant="subtitle1" gutterBottom align="center">
        <b>Atenção:</b> o título abaixo é como o item será exibido nos sites
      </Typography>

      <Grid container spacing={1}>
        <Grid item xs={12} md={12} sm={12}>
          <TextField
            label="Nome do Produto *"
            type="text"
            name="productName"
            inputRef={register({
              required: "Por favor digite o nome do produto.",
            })}
            style={{ width: "100%", marginBottom: 30 }}
            error={!!errors.productName}
            inputProps={{ maxLength: 200 }}
            helperText={
              errors.productName
                ? errors.productName.message
                : `Máximo de 200 caracteres. Dica de titulo otimizado para buscadores:
            produto + marca + modelo + referência do fornecedor + característica
            + cor.`
            }
            onBlur={e => {
              const value = e.target.value.trim();

              if (value !== "") return clearError("productName");

              setError(
                "productName",
                "empty",
                "Por favor digite o nome do produto.",
              );
            }}
          />

          {/* <p>{errors.productName && errors.productName.message}</p> */}
        </Grid>
      </Grid>
      <Typography
        variant="h5"
        gutterBottom
        align="center"
        className={classes.title}>
        Aonde aparecerá em nosso site? *
      </Typography>

      <Grid container spacing={1}>
        <Grid item {...gridSize}>
          <Breadcrumbs
            aria-label="breadcrumb"
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "15px",
              marginTop: "-10px",
            }}>
            <Link
              color="inherit"
              component="button"
              onClick={() => resetListItems()}>
              Todas Categorias
            </Link>
            {[...currentCategory.path_from_root].map(e => (
              <Link
                color="inherit"
                component="button"
                onClick={() => handleBreadcrumbClick(e)}>
                {e.name}
              </Link>
            ))}
            {/* 
            <Link color="inherit" href="/getting-started/installation/">
              Core
            </Link>
            <Typography color="textPrimary">Breadcrumb</Typography> */}
          </Breadcrumbs>
          <SimpleList
            // items={[...productCategories]}
            data-table="1"
            customHandleClick={handleListClick}
            items={currentCategory.children_categories}
            updateCurrentItem={updateCurrentItem}
          />
        </Grid>

        {/* Column 2 */}
        {/* <Grid item {...gridSize}>
          <SimpleList
            items={itemChildren.first ? itemChildren.first : null}
            updateCurrentItem={updateCurrentItem}
          />
        </Grid> */}
        {/* Column 3 */}
        {/* <Grid item {...gridSize}>
          <SimpleList
            items={itemChildren.second ? itemChildren.second : null}
            updateCurrentItem={updateCurrentItem}
          />
        </Grid> */}
        {/* Column 4 */}
        {/* <Grid item {...gridSize}>
          <SimpleList
            items={itemChildren.third ? itemChildren.third : null}
            updateCurrentItem={updateCurrentItem}
          />
        </Grid> */}
      </Grid>
      {/* {errors.username && errors.username.message} */}
    </React.Fragment>
  );
}
