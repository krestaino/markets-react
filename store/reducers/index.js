import { combineReducers } from 'redux'

import { stock } from './stock'
import { symbol } from './symbol'
import { symbols } from './symbols'
import { tab } from './tab'
import { favorites } from './favorites'
import { autoSuggest } from './autoSuggest'
import { sectors } from './sectors'
import { gainers } from './gainers'
import { losers } from './losers'
import { mostActive } from './mostActive'
import { crypto } from './crypto'

export default combineReducers({
  stock,
  symbol,
  symbols,
  tab,
  favorites,
  autoSuggest,
  sectors,
  gainers,
  losers,
  mostActive,
  crypto
})
