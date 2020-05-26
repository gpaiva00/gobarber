import React, { FC } from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/Auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: FC<RouteProps> = ({ isPrivate = false, component: Component, ...props }) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...props}
      render={({ location }) => {
        if (isPrivate === !!user) return <Component />;

        return (
          <Redirect
            to={{ pathname: isPrivate ? '/' : '/dashboard', state: { from: location } }}
          />
        );
      }}
    />
  );
};

export default Route;
