import { combineReducers } from 'redux'

import { stock } from './stock'
import { symbol } from './symbol'
import { symbols } from './symbols'
import { tab } from './tab'
import { favorites } from './favorites'

export default combineReducers({
  stock,
  symbol,
  symbols,
  tab,
  favorites
})
