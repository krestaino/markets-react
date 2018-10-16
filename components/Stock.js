import React, { Component } from "react";
import { Text, View } from "native-base";
import axios from "axios";
import { AsyncStorage } from "react-native";

class Stock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stockTicker: null
    };
  }

  getStockTicker = async () => {
    try {
      const value = await AsyncStorage.getItem("STOCK_TICKER");
      if (value !== null) {
        this.setState({ stockTicker: value });
      }
    } catch (error) {
      console.log(error);
    }
  };

  fetchAPI = () => {};

  componentDidMount() {
    this.getStockTicker();
  }

  render() {
    return (
      <View>
        <Text>Card</Text>
        <Text>{this.state.stockTicker}</Text>
      </View>
    );
  }
}

export default Stock;
