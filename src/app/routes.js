import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NotFound from '../views/notfound'
import SignIn from '../views/SignIn'
import SignUp from '../views/SignUp'
import Home from '../views/home'
import Profile from '../views/profile'

/**
 * Defines components to routes mapping.
 *
 * Everytime a new view is created, entry is required here to map the component to a specific route.
 *
 * [IMPORTANT]
 * All route entries are required to be done before the notFound component.
 *
 * @returns {XML}
 */
export default () => {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/home" component={Home} />
      <Route path="/profile" component={Profile} />
      <Route path="*" component={NotFound} />
    </Switch>
  )
}
