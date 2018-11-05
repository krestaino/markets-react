import React, { Component } from "react";
import {
  Header,
  Title,
  Button,
  Left,
  Right,
  Body,
  Icon,
  View
} from "native-base";

export default class TheHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Stock Check</Title>
          </Body>
          <Right />
        </Header>
      </View>
    );
  }
}
