import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import logo from '../assets/KcCovidLogo_color.png';

function Header() {
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
          <Nav.Link onClick={() => history.push('/')} className={path === '/' ? 'active' : ''}>Home</Nav.Link>
          <Nav.Link onClick={() => history.push('/volunteer')} className={path === '/volunteer' ? 'active' : ''}>Volunteer</Nav.Link>
          <Nav.Link onClick={() => history.push('/aid')} className={path === '/aid' ? 'active' : ''}>Request Aid</Nav.Link>
          <Nav.Link onClick={() => history.push('/submit')} className={path === '/submit' ? 'active' : ''}>Submit Data</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
