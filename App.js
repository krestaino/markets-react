import React, { Component } from "react";
import { Container, Footer, FooterTab, Button, Text } from "native-base";
import TheHeader from "./components/TheHeader";
import Search from "./components/Search";
import Stock from "./components/Stock";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
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
    );
  }
}
