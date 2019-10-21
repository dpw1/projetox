import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuItem from "@material-ui/core/MenuItem";

const styles = theme => ({
  root: {
    width: "100%",
    border: "1px solid rgb(189, 189, 189)",
    height: 250,
    overflowY: "scroll",
    backgroundColor: theme.palette.background.paper,
    "& .Mui-selected, & .Mui-selected:hover": {
      backgroundColor: theme.palette.primary.main
    },
    "& .Mui-selected *": {
      color: theme.palette.background.paper
    }
  }
});

class SimpleList extends React.Component {
  constructor(props) {
    super(props);

    this.state = { selected: null };
  }

  updateSelected(selectedIndex) {
    this.setState({ selected: selectedIndex });
  }

  handleClick(index, el) {
    this.updateSelected(index);
    this.props.updateCurrentItem && this.props.updateCurrentItem(el);
  }

  componentDidUpdate(prevProps, prevState) {
    /**
     * if JSON content is different, remove the "selected" class.
     */
    if (JSON.stringify(prevProps.items) !== JSON.stringify(this.props.items)) {
      this.setState({ selected: null });
    }
  }

  render() {
    const { classes, items } = this.props;
    const { selected } = this.state;

    const ItemsList = () =>
      items.map((e, i) => (
        <MenuItem
          button
          onClick={() => this.handleClick(i, e)}
          selected={selected === i}
          key={e.id}
        >
          <ListItemIcon>
            <span>{i + 1}</span>
          </ListItemIcon>
          <ListItemText primary={e.name} />
        </MenuItem>
      ));

    return (
      <div className={`${classes.root} SimpleList`}>
        <List>{!!items && <ItemsList></ItemsList>}</List>
      </div>
    );
  }
}

SimpleList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleList);
