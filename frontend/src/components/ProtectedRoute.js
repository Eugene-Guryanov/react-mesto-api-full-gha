import { Navigate} from 'react-router-dom';
import React from 'react';

function ProtectedRoute  ({ component: Component, ...props })  {
  return  props.loggedIn ? <Component {...props} /> : <Navigate to="/sign-in" />
};

export default ProtectedRoute;