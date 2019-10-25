import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RootRouter } from './router';
import { hot } from 'react-hot-loader/root';

const App = () => (
  <BrowserRouter>
    <RootRouter/>
  </BrowserRouter>
)

export default hot(App);
