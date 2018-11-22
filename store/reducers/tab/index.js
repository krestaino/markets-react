import { Actions } from '../../../constants'

const initialState = {
  index: 0,
  routes: [
    { key: 'favorites', title: 'Favorites', icon: "md-heart" },
    { key: 'search', title: 'Search', icon: "md-search" },
    { key: 'newTab2', title: 'Sectors', icon: "md-business" },
    { key: 'newTab4', title: 'Gainers', icon: "md-trending-up" },
    { key: 'newTab5', title: 'Losers', icon: "md-trending-down" },
    { key: 'newTab6', title: 'Most Active', icon: "md-flame" },
    { key: 'crypto', title: 'Crypto', icon: "logo-bitcoin" },
    { key: 'newTab1', title: 'IPO', icon: "md-calendar" },
    { key: 'newTab3', title: 'Earnings', icon: "logo-usd" }

  ]
}

export const tab = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_TAB:
      return { ...state, index: action.payload }
    default:
      return state
  }
}
