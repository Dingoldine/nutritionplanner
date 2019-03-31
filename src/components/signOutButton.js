import React from 'react'
import {FaSignOutAlt } from 'react-icons/fa'
import {
  NavLink
  } from 'reactstrap'  
import { withFirebase } from '../app/firebase'


const SignOutButton = ({ firebase }) => (
  <NavLink onClick={firebase.doSignOut} style={{cursor: "pointer"}}>
    Sign Out{' '}
    <span>
        <FaSignOutAlt />
    </span>
  </NavLink>
)

export default withFirebase(SignOutButton)
