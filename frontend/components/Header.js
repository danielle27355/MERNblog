import React, { useState } from 'react';
import Link from "next/link";
import Router from 'next/router';
import NProgress from 'nprogress';
import {APP_NAME} from '../config'
import {signout, isAuth} from '../actions/auth'
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
  DropdownItem,
  NavbarText
} from 'reactstrap';
import '.././node_modules/nprogress/nprogress.css'


Router.onRouteChangeStart = url => NProgress.start()
Router.onRouteChangeComplete = url => NProgress.done()
Router.onRouteChangeError = url => NProgress.done()

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link href="/">
          <NavLink href="/">{APP_NAME}</NavLink>
        </Link>
        
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            

          {!isAuth() && <React.Fragment>
            <NavItem>
            <Link href="/signin">
                <NavLink>Signin</NavLink>
              </Link>
            </NavItem>
          
            <NavItem>
              <Link href="/signup">
                <NavLink >Signup</NavLink>
              </Link>             
            </NavItem>
            
            </React.Fragment>}

            
            {isAuth() && ( 
            <NavItem>
              <NavLink style={{ cursor: 'pointer' }} onClick={() => signout(() => Router.replace(`/signin`))}>
                  Signout 
              </NavLink>          
            </NavItem>)}


            {isAuth() && isAuth().role === 0 && ( 
            <NavItem>
              <Link href="/user">
              <NavLink>
                  {`${isAuth().name}'s Dashboard`}
              </NavLink> 
              </Link>         
            </NavItem>)}
     
 
            {isAuth() && isAuth().role === 1 && ( 
            <NavItem>
              <Link href="/admin">
              <NavLink>
                  {`${isAuth().name}'s Dashboard`}
              </NavLink> 
              </Link>         
            </NavItem>)}
     
 
            {/* <UncontrolledDropdown nav inNavbar>
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
            </UncontrolledDropdown> */}
          </Nav>
          {/* <NavbarText>Simple Text</NavbarText> */}
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;