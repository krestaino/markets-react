import { Actions } from '../../../constants'

const initialState = { data: [], loading: null, error: false, symbols: [] }

export const favorites = (state = initialState, action) => {
  switch (action.type) {
    case Actions.TOGGLE_FAVORITE:
      const index = state.symbols.findIndex(symbol => symbol === action.payload)
      return index !== -1
        ? { ...state, symbols: [...state.symbols.slice(0, index), ...state.symbols.slice(index + 1)] }
        : { ...state, symbols: [...state.symbols, action.payload] }
    case Actions.GET_FAVORITES:
      return { ...state, loading: true, error: false }
    case Actions.GET_FAVORITES_SUCCESS:
      const data = Object.keys(action.payload.data).map(k => action.payload.data[k])
      data.sort((a, b) => a.quote.symbol.localeCompare(b.quote.symbol))
      return { ...state, loading: false, data: data }
    case Actions.GET_FAVORITES_FAIL:
      return { ...state, loading: false, error: 'No results found.' }
    case Actions.CLEAR_FAVORITES:
      return { ...state, data: [] }
    default:
      return state
  }
}
