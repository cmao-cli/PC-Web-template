import * as React from 'react';
import * as ReactDOM from '@hot-loader/react-dom';
import { Provider } from 'react-redux';
import { create_store } from './redux/root_store';;
import App from './App';

require('./commons/style.scss');
const store = create_store();

const root_element = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  root_element,
);


