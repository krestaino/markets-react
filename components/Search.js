import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import { Content, Icon, Text, Item, Input } from "native-base";

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stockTicker: null
    };
  }

  setStockTicker = async stockTicker => {
    try {
      await AsyncStorage.setItem("STOCK_TICKER", stockTicker);
    } catch (error) {
      console.log(error);
    }
  };

  getStockTicker = async () => {
    try {
      const value = await AsyncStorage.getItem("STOCK_TICKER");
      if (value !== null) {
        this.setState({ stockTicker: value })
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getStockTicker();
  }

  render() {
    return (
      <Content>
        <Item searchBar style={{ paddingLeft: 10 }}>
          <Icon name="ios-search" />
          <Input
            onChangeText={stockTicker => this.setStockTicker(stockTicker)}
            placeholder="Search by stock symbol"
            value={this.state.stockTicker}
          />
        </Item>
        <Text style={{ padding: 10 }}>This is Content Section</Text>
      </Content>
    );
  }
}
