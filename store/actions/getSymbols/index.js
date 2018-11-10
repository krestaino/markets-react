import { GET_SYMBOLS } from '../../../constants'

export const getSymbols = () => {
  return {
    type: GET_SYMBOLS,
    payload: {
      request: {
        url: 'ref-data/symbols'
      }
    }
  }
}
