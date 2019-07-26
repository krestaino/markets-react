import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'
import storage from 'redux-persist/lib/storage'
import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'

import reducers from './reducers'
import { API_KEY } from 'react-native-dotenv'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['favorites']
}

const client = axios.create({
  baseURL: 'https://cloud.iexapis.com/v1',
  responseType: 'json',
  params: {
    token: API_KEY
  },
})

const persistedReducer = persistReducer(persistConfig, reducers)

const store = createStore(persistedReducer, applyMiddleware(axiosMiddleware(client)))
const persistor = persistStore(store)

export default { store, persistor }
