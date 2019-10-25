import * as React from 'react';
import { Provider } from 'react-redux';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { create_store } from './redux/root_store';
import { RootRouter } from './router';

require('./commons/style.scss');
const store = create_store();
const root_element = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <RootRouter/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  root_element,
);