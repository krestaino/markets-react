import { Actions } from '../../../constants'

export const getLosers = () => {
  return {
    type: Actions.GET_LOSERS,
    payload: {
      request: {
        url: '/stock/market/list/losers'
      }
    }
  }
}
