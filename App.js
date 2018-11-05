import React, { Component } from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { Container, Footer, FooterTab, Button, Text } from "native-base";
import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";

import TheHeader from "./components/TheHeader";
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
  }

  render() {
    return (
      <Provider store={store}>
        <Container>
          <TheHeader />
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
