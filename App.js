import React, { Component } from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { Container, Footer, FooterTab, Button, Text } from "native-base";
import { Font, AppLoading } from "expo";
import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";

import Header from "./components/Header";
import Search from "./components/Search";
import Stock from "./components/Stock";

import reducer from "./reducer";

const client = axios.create({
  baseURL: "https://api.iextrading.com/1.0",
  responseType: "json"
});

const store = createStore(reducer, applyMiddleware(axiosMiddleware(client)));

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return (
        <Container>
          <AppLoading />
        </Container>
      );
    }
    return (
      <Provider store={store}>
        <Container>
          <Header />
          <Search />
          <Stock />
          <Footer>
            <FooterTab>
              <Button full>
                <Text>Footer</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      </Provider>
    );
  }
}
