import React, { Component } from "react";
import { Container, Footer, FooterTab, Button, Text } from "native-base";
import TheHeader from "./components/TheHeader";
import Search from "./components/Search";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <TheHeader />
        <Search />
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
