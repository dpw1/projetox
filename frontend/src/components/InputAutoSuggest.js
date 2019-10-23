import React, { useEffect } from "react";
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
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map(part => (
          <span
            key={part.text}
            style={{ fontWeight: part.highlight ? 500 : 400 }}
          >
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
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 &&
          suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

const useStyles = makeStyles(theme => ({
  root: {
    height: 250,
    flexGrow: 1
  },
  container: {
    position: "relative"
  },
  suggestionsContainerOpen: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0
  },
  suggestion: {
    display: "block"
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  },
  divider: {
    height: theme.spacing(2)
  }
}));

export default function InputAutoSuggest(props) {
  const classes = useStyles();
  const {
    suggestions,
    label,
    id,
    placeholder,
    customName,
    customProps
  } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [state, setState] = React.useState({
    single: "",
    popper: ""
  });
  const { register, setValue } = useFormContext(); // retrieve all hook methods

  //   console.log(props);

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

  const initiateHookForm = val => {
    register({ name: customName, type: `custom-${customName}` }, customProps);
    setValue(customName, val);
  };

  const handleSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value, suggestions));
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleChange = name => (event, { newValue }) => {
    setState({
      ...state,
      [name]: newValue
    });
    initiateHookForm(newValue);
  };

  useEffect(() => {
    // Update the document title using the browser API
    initiateHookForm("");
  }, []);

  const autosuggestProps = {
    renderInputComponent,
    suggestions: stateSuggestions,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
    onSuggestionsClearRequested: handleSuggestionsClearRequested,
    getSuggestionValue,
    renderSuggestion
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
          onChange: handleChange("single")
        }}
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion
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
