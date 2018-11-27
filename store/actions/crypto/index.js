import { Actions } from '../../../constants'

export const getCrypto = () => {
  return {
    type: Actions.GET_CRYPTO,
    payload: {
      request: {
        url: '/stock/market/crypto'
      }
    }
  }
}
