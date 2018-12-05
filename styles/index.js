import { StyleSheet } from 'react-native'
import { Colors } from '../constants'

export const globalStyles = StyleSheet.create({
  headerContainer: {
    borderBottomColor: Colors.BLUE2,
    borderBottomWidth: 1,
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: Colors.TEXT_DARK,
    fontSize: 13,
    fontWeight: '400',
    height: 50,
    lineHeight: 50,
    textAlign: 'center'
  },
  headerText: {

  }
})
