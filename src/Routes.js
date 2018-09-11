import React from 'react';
import { Switch } from 'react-router-dom';
import AppliedRoute from './components/AppliedRoute';

import StartPage from './StartPage';
import Article from './Article';
import Report from './Report';
import Digest from './Digest';

export default ({childProps}) =>
  <Switch>
    <AppliedRoute path="/" exact component={ StartPage } props={ childProps } />
    <AppliedRoute path="/articles/:id" component={ Article } props={ childProps } />
    <AppliedRoute path="/reports/:id" component={ Report } props={ childProps } />
    <AppliedRoute path="/digests/:id" component={ Digest } props={ childProps } />
  </Switch>;