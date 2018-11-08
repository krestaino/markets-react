import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View } from 'native-base'
import { Linking, TouchableOpacity } from 'react-native'
import { format } from 'date-fns'

class News extends Component {
  render() {
    const { news } = this.props.stock.data

    return (
      <View style={styles.container}>
        <Text style={styles.title}>News</Text>
        {news.map((article, index) => (
          <TouchableOpacity key={index} onPress={() => Linking.openURL(article.url)}>
            <View style={styles.item}>
              <Text style={styles.preHeadline}>{article.source} – {format(article.datetime, 'MMM D')}</Text>
              <Text style={styles.headline}>{article.headline}</Text>
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
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    marginTop: 16
  },
  preHeadline: {
    color: '#6d788c',
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
