import React from 'react'
import './navbar.css'
import { NavLink as RRNavLink } from 'react-router-dom';
import { FaUserCircle, FaGithub } from 'react-icons/fa';
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
  DropdownItem } from 'reactstrap';
  import SignOutButton from '../signOutButton';

  export default class Navigator extends React.Component {
    constructor(props) {
      super(props);
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false
      };
    }

    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }

    render() {
        return (
          <div>
            <Navbar color="light" light expand="md">
              <NavbarBrand href="/">Nutrition Planner</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink tag={RRNavLink} exact to="/profile">Profile <span><FaUserCircle/></span></NavLink>
                  </NavItem>
                  <NavItem>
                    <SignOutButton />
                  </NavItem>
                  <NavItem>
                    <NavLink  href="https://gits-15.sys.kth.se/wwes/nutritionplanner">GitHub <span><FaGithub/></span></NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Options
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
                        Option 1
                      </DropdownItem>
                      <DropdownItem>
                        Option 2
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>
                        Reset
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        );
    }
}
