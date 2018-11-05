import { combineReducers } from 'redux'

import { stock } from './stock'
import { symbol } from './symbol'
import { symbols } from './symbols'

export default combineReducers({
  stock,
  symbol,
  symbols
})
