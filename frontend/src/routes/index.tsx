import { Switch, Route } from 'react-router-dom';
import React, { FC } from 'react';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const Routes: FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
  </Switch>
);

export default Routes;
