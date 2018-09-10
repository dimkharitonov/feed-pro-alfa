import React from 'react';
import { Route, Switch } from 'react-router-dom';
import StartPage from './StartPage'

export default () =>
  <Switch>
    <Route path="/" exact component={ StartPage } />
  </Switch>;