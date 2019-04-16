import React from 'react'
import './navbar.css'
import { NavLink as RRNavLink } from 'react-router-dom'
import { FaUserCircle, FaGithub, FaSignInAlt, FaHome, FaUserPlus } from 'react-icons/fa'
import {
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'
import { slide as Menu } from 'react-burger-menu'
import SignOutButton from '../SignOutButton/SignOutButton'
import { withFirebase } from '../../App/firebase'

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
        })
        firebase.user(user.uid)
        .onSnapshot(snapshot => {
          this_.setState({ 
            username: snapshot.data().username
          })
        })
      } else {
        // No user is signed in.
        this_.setState({isLoggedIn: false})
      }
    });
  }


  toggle() {
    const { isOpen } = this.state
    this.setState({
      isOpen: !isOpen
    })
  }

  render() {
    const { isLoggedIn, username, isOpen } = this.state
    return (  
      <Menu noOverlay disableAutoFocus id="sidebar" className="sidebar-menu mediumFont" onStateChange={ this.toggle } isOpen={ isOpen }>
      <div className="username-field">
          {username}
      </div>
      <Nav vertical>
        {isLoggedIn ? (
          [
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
            [ 
            <div className="welcome-text smallFont">
              <p>Welcome! </p>
              <p>
               Register now or sign in to get started!</p>
            </div>,

            <NavItem >
              <NavLink tag={RRNavLink} exact to="/signup" >
                Sign Up{' '}
                <span>
                  <FaUserPlus />
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
            </NavItem>,

            <NavItem className="logon">
              <NavLink tag={RRNavLink} exact to="/home" >
                Sign In{' '}
                <span>
                  <FaSignInAlt />
                </span>
              </NavLink>
            </NavItem> 
            ]
          )}
        </Nav>
      </Menu>
    )
  }
}

export default withFirebase(Navigator);