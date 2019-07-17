import * as React from 'react';
import { Switch, Route } from 'react-router';
import { routes } from './router/routes';

export const RootRouter = () => (
  <Switch>
    {
      routes.map((val, key) => <Route {...val} key={`route_${key}`}/>)
    }
  </Switch>
);