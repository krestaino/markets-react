import React, { Component } from "react";
import { connect } from "react-redux";
import { List, ListItem, Text } from "native-base";

import { fetchSymbols } from "../reducer";

class Symbols extends Component {
  componentDidMount = () => {
    this.props.fetchSymbols();
  };

  render() {
    return (
      <List>
        <ListItem>
          <Text>{this.props.symbols.length}</Text>
        </ListItem>
        <ListItem>
          <Text>Nathaniel Clyne</Text>
        </ListItem>
        <ListItem>
          <Text>Dejan Lovren</Text>
        </ListItem>
      </List>
    );
  }
}

const mapStateToProps = state => {
  return {
    symbol: state.symbol,
    symbols: state.symbols
  };
};

const mapDispatchToProps = {
  fetchSymbols
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Symbols);
