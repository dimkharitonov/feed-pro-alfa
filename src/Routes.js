import React from 'react';
import { Switch } from 'react-router-dom';
import AppliedRoute from './components/AppliedRoute';

import StartPage from './StartPage'

export default ({childProps}) =>
  <Switch>
    <AppliedRoute path="/" exact component={StartPage} props={childProps} />
  </Switch>;