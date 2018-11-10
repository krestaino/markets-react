import React, { Component } from 'react'
import { Linking, TouchableOpacity } from 'react-native'
import { Text, View } from 'native-base'
import { connect } from 'react-redux'
import { format } from 'date-fns'

import { TEXT_DARK } from '../../../constants'

class News extends Component {
  render() {
    const { news } = this.props.stock.data

    return (
      <View style={styles.container}>
        <Text style={styles.title}>News</Text>
        {news.map((article, index) => (
          <TouchableOpacity key={index} onPress={() => Linking.openURL(article.url)}>
            <View style={styles.item}>
              <Text style={styles.preHeadline}>
                {article.source} – {format(article.datetime, 'MMM D, h:mm a')}
              </Text>
              <View>
                <Text style={styles.headline}>{article.headline}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    )
  }
}

const styles = {
  container: {
    flexDirection: 'column',
    padding: 16,
    marginBottom: 64
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20
  },
  item: {
    flexDirection: 'column',
    flex: 1,
    flexWrap: 'wrap',
    marginTop: 16
  },
  preHeadline: {
    color: TEXT_DARK,
    fontSize: 13
  },
  headline: {
    fontWeight: 'bold',
    marginTop: 4
  },
  summary: {
    marginTop: 8
  }
}

const mapStateToProps = state => {
  return {
    stock: state.stock
  }
}

export default connect(mapStateToProps)(News)
