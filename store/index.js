import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'
import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import reducers from './reducers'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['favorites']
}

const client = axios.create({
  baseURL: 'https://api.iextrading.com/1.0',
  responseType: 'json'
})

const persistedReducer = persistReducer(persistConfig, reducers)

const store = createStore(persistedReducer, applyMiddleware(axiosMiddleware(client)))
const persistor = persistStore(store)

export default { store, persistor }
