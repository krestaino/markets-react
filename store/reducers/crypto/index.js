import { Actions } from '../../../constants'

const initialState = { data: [], latestUpdate: null, loading: null, error: false }

export const crypto = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_CRYPTO:
      return { ...state, latestUpdate: null, loading: true, error: false }
    case Actions.GET_CRYPTO_SUCCESS:
      const data = Object.keys(action.payload.data).map(k => action.payload.data[k])
      data.sort((a, b) => a.symbol.localeCompare(b.symbol))
      return { ...state, latestUpdate: new Date(), loading: false, data: data }
    case Actions.GET_CRYPTO_FAIL:
      return { ...state, latestUpdate: null, loading: false, error: 'No results found.' }
    default:
      return state
  }
}
