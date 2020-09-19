import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createAPI from './services/api';
import createStore from './redux/store';
import App from './components/App';
import createFavoritesService from './services/favoritesService';
import '../styles/index.css';

const api = createAPI();
const favoritesService = createFavoritesService();

const thunkExtraArgument = {
  api,
  favoritesService,
};

const store = createStore({
  thunkExtraArgument,
});

function renderApp() {
  const rootElement = document.getElementById('root');

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootElement,
  );
}

renderApp();
