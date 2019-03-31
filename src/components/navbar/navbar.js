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

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const { isLoggedIn } = this.state
    return (  
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand tag={RRNavLink} exact to="/home">Nutrition Planner</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
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
                {isLoggedIn ? (
                    <NavItem>
                        <SignOutButton />
                    </NavItem>
                ) : (
                  <NavItem>
                    <NavLink tag={RRNavLink} exact to="/home">
                      Sign In{' '}
                      <span>
                        <FaSignInAlt />
                      </span>
                    </NavLink>
                  </NavItem>
                )}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

export default withFirebase(Navigator);