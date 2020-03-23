import React from 'react';
import ReactDOM from 'react-dom';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import HomePage from './components/HomePage';
import RequestAidForm from './components/RequestAidForm';
import VolunteerForm from './components/VolunteerForm';

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
      <AppBar position="responsive">
        <Tabs value={currentTab} onChange={handleChange} centered>
          <Tab label="Home" id="home-tab" value="home-tab" />
          <Tab label="Volunteer" id="volunteer-tab" value="volunteer-tab" />
          <Tab label="Request Aid" id="aid-tab" value="aid-tab" />
          <Tab label="Submit Data" id="submit-tab" value="submit-tab" />
        </Tabs>
      </AppBar>
      { currentTab === 'home-tab' && <HomePage /> }
      { currentTab === 'volunteer-tab' && <VolunteerForm /> }
      { currentTab === 'aid-tab' && <RequestAidForm /> }
      { currentTab === 'submit-tab' && <p>Put in some data</p> }
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
