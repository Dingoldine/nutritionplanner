import React from 'react'
import {FaSignOutAlt } from 'react-icons/fa'
import {
  NavLink
  } from 'reactstrap'  
import { withFirebase } from '../../App/firebase'


const SignOutButton = ({ firebase }) => (
  <NavLink onClick={firebase.doSignOut} style={{cursor: "pointer"}}>
      <FaSignOutAlt />
  </NavLink>
)

export default withFirebase(SignOutButton)
