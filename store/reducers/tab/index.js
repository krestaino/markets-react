import { SET_TAB } from '../../constants'

const initialState = {
  index: 0,
  routes: [{ key: 'search', title: 'Search' }, { key: 'favorites', title: 'Favorites' }]
}

export const tab = (state = initialState, action) => {
  switch (action.type) {
    case SET_TAB:
      return { ...state, index: action.payload }
    default:
      return state
  }
}
