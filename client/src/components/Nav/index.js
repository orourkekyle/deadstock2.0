import React, {useState} from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  DropdownToggle,
  Dropdown,
  DropdownItem,
  DropdownMenu,
} from 'reactstrap';
import "./style.css"

const Navy = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  let redirectPath = (process.env.NODE_ENV === 'production') ? 'https://fathomless-shore-38628.herokuapp.com/oauth/logout' : 'http://localhost:3001/oauth/logout'
  // let redirectPath = "https://fathomless-shore-38628.herokuapp.com/oauth/logout";
  // let redirectPath = "http://localhost:3001/oauth/logout";

  return (
    <div>
      <Navbar fixed="top" color="black" light expand="md">
        {/* <NavbarBrand className="deadstock" href="/browsing"><strong>DeadStock</strong></NavbarBrand> */}
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle className="deadstock" caret ><strong>DeadStock</strong></DropdownToggle>
            <DropdownMenu style={{background: "grey"}}>
          <Nav className="mr-auto" navbar>
              <DropdownItem>
                <NavLink style={{color: "black"}} href="/browsing">Browse</NavLink>
              </DropdownItem>
              <DropdownItem>
                <NavLink style={{color: "black"}} href="/profile">Profile</NavLink>
              </DropdownItem>
              <DropdownItem>
                <NavLink style={{color: "black"}} href={redirectPath}>Logout</NavLink>
              </DropdownItem>
          </Nav>
          {/* <NavLink style={{color: "black"}} href={redirectPath}>Logout</NavLink> */}
          </DropdownMenu>
          </Dropdown>

      </Navbar>
    </div>
  );
}

export default Navy;