import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NotFound from '../containers/NotFound/NotFound'
import SignIn from '../containers/SignIn'
import SignUp from '../containers/SignUp'
import Home from '../containers/Home'
import Profile from '../containers/Profile'

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
      <Route path="/home" component={Home}  />
      <Route path="/profile" component={Profile} />
      <Route path="*" component={NotFound} />
    </Switch>
  )
}
