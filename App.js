import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Item, Input } from 'native-base';

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Stock Check</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Item searchBar paddingLeft={40}>
            <Icon name="ios-search"/>
            <Input placeholder="Search by stock symbol" />
          </Item>
          <Text>
            This is Content Section
          </Text>
        </Content>
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
