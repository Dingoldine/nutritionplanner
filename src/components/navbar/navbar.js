import React from 'react'
import './navbar.css'
import { NavLink as RRNavLink } from 'react-router-dom'
import { FaUserCircle, FaGithub, FaSignInAlt } from 'react-icons/fa'
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
      isLoggedIn: false
    }

    const { firebase } = this.props
    
    const this_ = this

    firebase.auth.onAuthStateChanged(function(user) {
      if (user) {
        this_.setState({isLoggedIn: true})
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
    const { isLoggedIn } = this.state
    return (  
      <Menu noOverlay disableAutoFocus id="sidebar" className="sidebar-menu">
      <Nav vertical>
            <NavItem>
                <NavLink tag={RRNavLink} exact to="/profile">
                  Profile{' '}
                  <span>
                    <FaUserCircle />
                  </span>
                </NavLink>
              </NavItem>
              <NavItem>
            <NavLink href="https://gits-15.sys.kth.se/wwes/nutritionplanner">
                  GitHub{' '}
                  <span>
                    <FaGithub />
                  </span>
                </NavLink>
              </NavItem>
              {isLoggedIn ? (
                    <NavItem className="logoff">
                        <SignOutButton />
                    </NavItem>
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
        <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
        </Nav>
        <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
      </Menu>
    )
  }
}

export default withFirebase(Navigator);