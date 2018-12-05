import { Actions } from '../../../constants'

export const getSectors = () => {
  return {
    type: Actions.GET_SECTORS,
    payload: {
      request: {
        url: '/stock/market/sector-performance'
      }
    }
  }
}
