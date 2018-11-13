import { Actions } from '../../../constants'

export const setSymbol = symbol => {
  return {
    type: Actions.SET_SYMBOL,
    payload: symbol
  }
}
