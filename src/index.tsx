// import 'react-hot-loader';
import * as React from 'react';
// import { Provider } from 'react-redux';
import * as ReactDOM from '@hot-loader/react-dom';
import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
import { create_store } from './redux/root_store';;
// import { RootRouter } from './router';
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

// if ((module as any).hot) {
//   (module as any).hot.accept('./App.tsx', () => {
//     ReactDOM.render(
//       <App/>,
//       root_element,
//     );
//   });
// }

