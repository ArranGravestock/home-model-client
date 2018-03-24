import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {auth} from './login';

// const fakeAuth = {
//     isAuthenticated: false,
//     authenticate(cb) {
//       this.isAuthenticated = true
//     },
//     signout(cb) {
//       this.isAuthenticated = false
//       setTimeout(cb, 100)
//     }
// }

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
        auth.isAuthenticated ? (
          <Component {...props}/>
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }}/>
        )
      )
    }
  />
)

export {PrivateRoute};