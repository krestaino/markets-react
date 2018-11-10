import React, { Component } from 'react'
import { BackHandler, FlatList, Keyboard } from 'react-native'
import { Text, View } from 'native-base'
import { connect } from 'react-redux'
import Touchable from 'react-native-platform-touchable'

import { BLUE1, BLUE2, BLUE3, TEXT_DARK } from '../../../constants'
import { getStock, getSymbols, setSymbol, showAutoSuggest } from '../../../store/actions'

class AutoSuggest extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filteredSearch: []
    }

    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
  }

  componentDidMount = () => this.props.getSymbols()

  componentWillReceiveProps(nextProps) {
    if (nextProps.symbol.length > 0) {
      const matches = this.props.symbols.data.filter(stock => stock.symbol.startsWith(nextProps.symbol)).slice(0, 20)
      this.setState({ filteredSearch: matches })
    } else {
      this.setState({ filteredSearch: [] })
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
  }

  handleBackPress = () => {
    if (this.props.autoSuggest) {
      this.props.showAutoSuggest(false)
      return true
    } else {
      return false
    }
  }

  onPress = symbol => {
    this.props.getStock(symbol)
    this.props.setSymbol(symbol)
    this.props.showAutoSuggest(false)
    this.setState({ filteredSearch: [] })
    Keyboard.dismiss()
  }

  render() {
    const { filteredSearch } = this.state

    if (!this.props.autoSuggest) {
      return <View />
    }

    return (
      <View>
        {filteredSearch.length ? (
          <FlatList
            data={filteredSearch}
            keyboardShouldPersistTaps="always"
            keyExtractor={item => item.symbol}
            style={styles.container}
            renderItem={({ item }) => (
              <Touchable
                background={Touchable.Ripple(BLUE3)}
                onPress={() => this.onPress(item.symbol)}
                style={styles.item}
              >
                <Text ellipsizeMode="tail" numberOfLines={1}>
                  {item.symbol} <Text style={styles.name}>{item.name}</Text>
                </Text>
              </Touchable>
            )}
          />
        ) : (
          <View style={styles.container}>
            <Text style={styles.item}>No results found. Try searching anyways, who knows!?</Text>
          </View>
        )}
      </View>
    )
  }
}

const styles = {
  container: {
    backgroundColor: BLUE2,
    borderTopColor: BLUE1,
    borderTopWidth: 1,
    height: '100%',
    width: '100%',
    paddingBottom: 16
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  name: {
    color: TEXT_DARK,
    fontSize: 13
  }
}

const mapStateToProps = state => {
  return {
    autoSuggest: state.autoSuggest,
    symbol: state.symbol,
    symbols: state.symbols
  }
}

const mapDispatchToProps = {
  getStock,
  getSymbols,
  setSymbol,
  showAutoSuggest
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AutoSuggest)
