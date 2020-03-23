import React from 'react';
import ReactDOM from 'react-dom';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { Container, Navbar, Nav } from 'react-bootstrap';

import HomePage from './components/HomePage';
import RequestAidForm from './components/RequestAidForm';
import VolunteerForm from './components/VolunteerForm';
import logo from './assets/KcCovidLogo_color.png';

import './App.scss';

// TODO INTL
// TODO ErrorBoundary + wrap all components in one
// TODO have error boundary log errors to slack?
function App() {
  const [currentTab, setTab] = React.useState('home-tab');

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  // TODO SOON make app bar width responsive
  return (
    <div className="App">
      {/* <AppBar position="fixed">
        <Tabs value={currentTab} onChange={handleChange} centered>
          <Tab label="Home" id="home-tab" value="home-tab" />
          <Tab label="Volunteer" id="volunteer-tab" value="volunteer-tab" />
          <Tab label="Request Aid" id="aid-tab" value="aid-tab" />
          <Tab label="Submit Data" id="submit-tab" value="submit-tab" />
        </Tabs>
      </AppBar> */}
      <Navbar bg="light" fixed="top">
        <Navbar.Brand href="#home" onClick={() => setTab('home-tab')}>
          <img src={logo} style={{ height: '20px' }} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav class="mr-auto">
            <Nav.Link onClick={() => setTab('home-tab')}>Home</Nav.Link>
            <Nav.Link onClick={() => setTab('volunteer-tab')}>Volunteer</Nav.Link>
            <Nav.Link onClick={() => setTab('aid-tab')}>Request Aid</Nav.Link>
            <Nav.Link onClick={() => setTab('submit-tab')}>Submit Data</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div style={{ height: '56px' }}></div>
      <Container>
        {currentTab === 'home-tab' && <HomePage />}
        {currentTab === 'volunteer-tab' && <VolunteerForm />}
        {currentTab === 'aid-tab' && <RequestAidForm />}
        {currentTab === 'submit-tab' && <p>Put in some data</p>}
      </Container>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
