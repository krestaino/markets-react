import { combineReducers } from 'redux'

import { stock } from './stock'
import { symbol } from './symbol'
import { symbols } from './symbols'
import { tab } from './tab'
import { favorites } from './favorites'
import { autoSuggest } from './autoSuggest'
import { gainers } from './gainers'
import { losers } from './losers'
import { crypto } from './crypto'

export default combineReducers({
  stock,
  symbol,
  symbols,
  tab,
  favorites,
  autoSuggest,
  gainers,
  losers,
  crypto
})
