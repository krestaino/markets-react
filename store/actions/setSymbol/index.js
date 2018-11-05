import { SET_SYMBOL } from '../../constants'

export const setSymbol = symbol => {
  return {
    type: SET_SYMBOL,
    payload: symbol
  }
}
