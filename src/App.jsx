import React from 'react';
import ReactDOM from 'react-dom';

import { Container, Navbar, Nav } from 'react-bootstrap';

import HomePage from './components/HomePage';
import RequestAidForm from './components/RequestAidForm';
import VolunteerForm from './components/VolunteerForm';
import logo from './assets/KcCovidLogo_color.png';

import './App.scss';

// TODO INTL
// TODO ErrorBoundary + wrap all components in one
// TODO have error boundary log errors to slack?
// TODO no inline style
// TODO make tab bar recoil on tab click
function App() {
  const [currentTab, setTab] = React.useState('home-tab');

  // TODO SOON make app bar width responsive
  return (
    <div className="App">
      <Navbar bg="light" fixed="top" expand="lg">
        <Navbar.Brand href="#home" onClick={() => setTab('home-tab')}>
          <img src={logo} style={{ height: '20px', marginTop: '-8px' }} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={() => setTab('home-tab')} className={currentTab === 'home-tab' ? 'active' : ''}>Home</Nav.Link>
            <Nav.Link onClick={() => setTab('volunteer-tab')} className={currentTab === 'volunteer-tab' ? 'active' : ''}>Volunteer</Nav.Link>
            <Nav.Link onClick={() => setTab('aid-tab')} className={currentTab === 'aid-tab' ? 'active' : ''}>Request Aid</Nav.Link>
            <Nav.Link onClick={() => setTab('submit-tab')} className={currentTab === 'submit-tab' ? 'active' : ''}>Submit Data</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div style={{ height: '60px' }} />
      <Container>
        {currentTab === 'home-tab' && <HomePage setTab={setTab} />}
        {currentTab === 'volunteer-tab' && <VolunteerForm />}
        {currentTab === 'aid-tab' && <RequestAidForm />}
        {currentTab === 'submit-tab' && <p>Put in some data</p>}
      </Container>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
