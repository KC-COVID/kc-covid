import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import logo from '../assets/KcCovidLogo_color.png';

/**
 * The header component for the page. Handles rendering the tab bar and routing to the proper page on tab click.
 */
function Header() {
  // react-router hooks. History let's us navigate to new and previous routes. Location is our current route.
  const history = useHistory();
  const location = useLocation();

  const path = location.pathname;

  return (
    <Navbar bg="light" fixed="top" expand="lg">
      <Navbar.Brand onClick={() => history.push('/')}>
        <img src={logo} style={{ height: '20px', marginTop: '-8px' }} alt="logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={() => history.push('/')} id="home-tab" className={path === '/' ? 'active' : ''}>Home</Nav.Link>
          <Nav.Link
            onClick={() => history.push('/volunteer')}
            id="volunteer-tab"
            className={path === '/volunteer' ? 'active' : ''}
          >
            Volunteer
          </Nav.Link>
          <Nav.Link
            onClick={() => history.push('/aid')}
            id="aid-tab"
            className={path === '/aid' ? 'active' : ''}
          >
            Request Aid
          </Nav.Link>
          <Nav.Link
            onClick={() => history.push('/submit')}
            id="submit-tab"
            className={path === '/submit' ? 'active' : ''}
          >
            Submit Data
          </Nav.Link>
          <Nav.Link
            onClick={() => history.push('/resources')}
            id="submit-tab"
            className={path === '/submit' ? 'active' : ''}
          >
            Resources
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
