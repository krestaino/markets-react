import { Actions } from '../../../constants'

export const getGainers = () => {
  return {
    type: Actions.GET_GAINERS,
    payload: {
      request: {
        url: '/stock/market/list/gainers'
      }
    }
  }
}
