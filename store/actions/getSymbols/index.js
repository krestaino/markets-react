import { Actions } from '../../../constants'

export const getSymbols = () => {
  return {
    type: Actions.GET_SYMBOLS,
    payload: {
      request: {
        url: 'ref-data/symbols'
      }
    }
  }
}
