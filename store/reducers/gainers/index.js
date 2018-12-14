import { Actions } from '../../../constants'

const initialState = { data: [], latestUpdate: null, loading: null, error: false }

export const gainers = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_GAINERS:
      return { ...state, latestUpdate: null, loading: true, error: false }
    case Actions.GET_GAINERS_SUCCESS:
      const data = Object.keys(action.payload.data).map(k => action.payload.data[k])
      return { ...state, latestUpdate: new Date(), loading: false, data: data }
    case Actions.GET_GAINERS_FAIL:
      return { ...state, latestUpdate: null, loading: false, error: 'No results found.' }
    default:
      return state
  }
}
