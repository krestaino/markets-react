import {
  CLEAR_FAVORITES,
  TOGGLE_FAVORITE,
  GET_FAVORITES,
  GET_FAVORITES_SUCCESS,
  GET_FAVORITES_FAIL
} from '../../../constants'

const initialState = {
  data: [],
  loading: null,
  error: false,
  symbols: []
}

export const favorites = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const index = state.symbols.findIndex(symbol => symbol === action.payload)
      return index !== -1
        ? { ...state, symbols: [...state.symbols.slice(0, index), ...state.symbols.slice(index + 1)] }
        : { ...state, symbols: [...state.symbols, action.payload] }
    case GET_FAVORITES:
      return { ...state, loading: true, error: false }
    case GET_FAVORITES_SUCCESS:
      let data = Object.keys(action.payload.data).map(k => action.payload.data[k])
      data.sort((a, b) => a.quote.symbol.localeCompare(b.quote.symbol))
      return { ...state, loading: false, data: data }
    case GET_FAVORITES_FAIL:
      return {
        ...state,
        loading: false,
        error: 'No results found.'
      }
    case CLEAR_FAVORITES:
      return { ...state, data: [] }
    default:
      return state
  }
}
