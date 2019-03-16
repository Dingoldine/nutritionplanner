import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NotFound from '../views/notfound'
import Home from '../views/home'
import SignUp from '../views/SignUp'

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
      <Route exact path="/" component={Home} />
      <Route path="/signup" component={SignUp} />
      {/* <Route path="/profile" component={() => Profile } /> */}
      <Route path="*" component={NotFound} />
    </Switch>
  )
}
