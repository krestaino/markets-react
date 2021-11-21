import { Actions } from '../../../constants'

const initialState = {
  index: 0,
  previousIndex: 0,
  routes: [
    { key: 'favorites', title: 'Favorites', icon: 'md-heart' },
    { key: 'search', title: 'Search', icon: 'md-search' },
    // { key: 'sectors', title: 'Sectors', icon: 'md-business' },
    { key: 'gainers', title: 'Gainers', icon: 'md-trending-up' },
    { key: 'losers', title: 'Losers', icon: 'md-trending-down' },
    { key: 'mostActive', title: 'Most Active', icon: 'md-flame' },
    // { key: 'crypto', title: 'Crypto', icon: 'logo-bitcoin' }
    // { key: 'ipo', title: 'IPO', icon: "md-calendar" },
    // { key: 'earnings', title: 'Earnings', icon: "logo-usd" }
  ]
}

export const tabs = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_TAB:
      return { ...state, index: action.payload, previousIndex: state.index }
    default:
      return state
  }
}
