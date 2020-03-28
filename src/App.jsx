import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Container } from 'react-bootstrap';

import Header from './components/Header';
import HomePage from './components/HomePage';
import RequestAidForm from './components/RequestAidForm';
import VolunteerForm from './components/VolunteerForm';

import './App.scss';

// TODO add logic server side to serve this content correctly with history
// TODO ErrorBoundary + wrap all components in one
// TODO INTL
function App() {
  // TODO SOON make app bar width responsive
  return (
    <Router>
      <div className="App">
        <Header />
        <div style={{ height: '60px' }} />
        <Container>
          <Switch>
            <Route path="/aid">
              <RequestAidForm />
            </Route>
            <Route path="/volunteer">
              <VolunteerForm />
            </Route>
            <Route path="submit">
              <p>Put in some data</p>
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
