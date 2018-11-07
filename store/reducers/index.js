import { combineReducers } from 'redux'

import { stock } from './stock'
import { symbol } from './symbol'
import { symbols } from './symbols'
import { tab } from './tab'

export default combineReducers({
  stock,
  symbol,
  symbols,
  tab
})
