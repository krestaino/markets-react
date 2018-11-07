import React, { Component } from 'react'
import { Header, Title, Button, Left, Right, Body, Icon } from 'native-base'

export default class TheHeader extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Header>
        <Left>
          <Button transparent>
            <Icon ios='ios-menu' android="md-menu" />
          </Button>
        </Left>
        <Body>
          <Title>Stock Check</Title>
        </Body>
        <Right />
      </Header>
    )
  }
}
