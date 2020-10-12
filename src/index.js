import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import App from './App';
import MemoStore, { memoReducer } from './memo/Store';
import * as serviceWorker from './serviceWorker';

// redux persist
const persistConfig = {
  key: 'memo',
  storage,
  blacklist: ['message', 'mode', 'fdata'],
  whitelist: ['data']
};

// create persistreducer
const persistedReducer = persistReducer(persistConfig, memoReducer);

//create store and persister
let store = createStore(persistedReducer);
let pstore = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<p>loading...</p>} persistor={pstore}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

export default pstore;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
