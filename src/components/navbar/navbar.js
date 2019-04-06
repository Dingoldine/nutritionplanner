import React from 'react'
import './navbar.css'
import { NavLink as RRNavLink } from 'react-router-dom'
import { FaUserCircle, FaGithub, FaSignInAlt, FaHome } from 'react-icons/fa'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import { slide as Menu } from 'react-burger-menu'
import SignOutButton from '../signOutButton'
import { withFirebase } from '../../app/firebase'

class Navigator extends React.Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false,
      isLoggedIn: false,
      username: ""
    }

    const { firebase } = this.props
    
    const this_ = this

    firebase.auth.onAuthStateChanged(function(user) {
      if (user) {
        this_.setState({
          isLoggedIn: true,
          username: user.username
        })
      } else {
        // No user is signed in.
        this_.setState({isLoggedIn: false})
      }
    });
  }

  showSettings (event) {
    event.preventDefault();
    
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const { isLoggedIn, username } = this.state
    return (  
      <Menu noOverlay disableAutoFocus id="sidebar" className="sidebar-menu" onStateChange={ this.toggle }>
      <Nav vertical>
        {isLoggedIn ? (
          [
          <div className="username">
          {username}
          </div>,

          <NavItem className="logoff">
              <SignOutButton />
          </NavItem> ,

          <NavItem>
          <NavLink tag={RRNavLink} exact to="/profile">
            Profile{' '}
            <span>
              <FaUserCircle />
            </span>
          </NavLink>
        </NavItem>,

        <NavItem>
          <NavLink tag={RRNavLink} exact to="/home">
          Home{' '}
          <span>
            <FaHome />
          </span>
          </NavLink>
        </NavItem>,
        
        <NavItem className="github-nav"> 
          <NavLink href="https://gits-15.sys.kth.se/wwes/nutritionplanner">
            GitHub{' '}
            <span>
              <FaGithub />
            </span>
          </NavLink>
        </NavItem>
          ]
          ) : (
            <NavItem>
              <NavLink tag={RRNavLink} exact to="/home" className="logon">
                Sign In{' '}
                <span>
                  <FaSignInAlt />
                </span>
              </NavLink>
            </NavItem>
          )}
        </Nav>
      </Menu>
    )
  }
}

export default withFirebase(Navigator);