import React, { useEffect, useCallback } from "react";
import deburr from "lodash/deburr";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Popper from "@material-ui/core/Popper";
import { makeStyles } from "@material-ui/core/styles";
import useForm, { FormContext, useFormContext } from "react-hook-form";

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const text = `${suggestion.label} (${suggestion.ean})`;
  const matches = match(text, query);
  const parts = parse(text, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map(part => (
          <span
            key={part.text}
            style={{ fontWeight: part.highlight ? 500 : 400 }}>
            {part.text}
          </span>
        ))}
      </div>
    </MenuItem>
  );
}

function getSuggestions(value, suggestions) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(({ label }) => {
        const keep =
          count < 5 && label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

function getSuggestionValue(suggestion) {
  return suggestion.ean;
}

const useStyles = makeStyles(theme => ({
  root: {
    height: 250,
    flexGrow: 1,
  },
  container: {
    position: "relative",
  },
  suggestionsContainerOpen: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  suggestion: {
    display: "block",
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  divider: {
    height: theme.spacing(2),
  },
}));

export default function InputAutoSuggest(props) {
  const classes = useStyles();
  const {
    suggestions,
    label,
    id,
    placeholder,
    customName,
    customProps,
  } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [state, setState] = React.useState({
    single: "",
    popper: "",
  });
  const { register, setValue } = useFormContext(); // retrieve all hook methods

  function renderInputComponent(inputProps) {
    const { classes, inputRef = () => {}, ref, ...other } = inputProps;

    return (
      <TextField
        fullWidth
        name={customName}
        ref={ref}
        inputRef={inputRef}
        {...other}
      />
    );
  }

  const [stateSuggestions, setSuggestions] = React.useState([]);

  const initiateHookForm = useCallback(val => {
    register({ name: customName, type: `custom-${customName}` }, customProps);
    setValue(customName, val);
  });

  /**
   * TODO: show suggestions of searched EANS
   */
  const handleSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value, suggestions));
    // setSuggestions(suggestions);
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleChange = name => async (event, { newValue }) => {
    await props.customOnChange(event.target.value);
    // console.log(stateSuggestions);
    setState({
      ...state,
      [name]: newValue,
    });
    initiateHookForm(newValue);
  };

  useEffect(() => {
    setSuggestions(suggestions);
  }, []); // eslint-disable-line

  const autosuggestProps = {
    renderInputComponent,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
    onSuggestionsClearRequested: handleSuggestionsClearRequested,
    getSuggestionValue,
    renderSuggestion,
  };

  return (
    <div className={classes.root}>
      <Autosuggest
        {...autosuggestProps}
        inputProps={{
          classes,
          id,
          label,
          placeholder,
          value: state.single,
          onChange: handleChange("single"),
        }}
        suggestions={suggestions}
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          // suggestion: classes.suggestion,
        }}
        renderSuggestionsContainer={options => (
          <Paper {...options.containerProps} square>
            {options.children}
          </Paper>
        )}
      />
    </div>
  );
}
