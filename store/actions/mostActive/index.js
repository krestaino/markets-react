import { Actions } from '../../../constants'

export const getMostActive = () => {
  return {
    type: Actions.GET_MOST_ACTIVE,
    payload: {
      request: {
        url: '/stock/market/list/mostactive'
      }
    }
  }
}
