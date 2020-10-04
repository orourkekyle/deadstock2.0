import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Collapse,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

const Navy = (props) => {

  let logoutPath = (process.env.NODE_ENV === "production") ? "https://fathomless-shore-38628.herokuapp.com/oauth/logout" : "http://localhost:3001/oauth/logout"

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/browsing">DeadStock</NavbarBrand>
          <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/browsing">Browse</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/profile">Profile</NavLink>
              </NavItem>
          </Nav>
          <NavLink href={logoutPath}>Logout</NavLink>
      </Navbar>
    </div>
  );
}

export default Navy;