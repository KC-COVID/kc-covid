import React from 'react';
import { Container } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import HomePage from './components/HomePage';
import RequestAidForm from './components/RequestAidForm';
import VolunteerForm from './components/VolunteerForm';
import ResourcesPage from './components/resources/ResourcesPage';

import './App.scss';

// TODO KCOVID-13 logic server side to serve this content correctly with history
function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Header />
          <div style={{ height: '60px' }} />
          <Container fluid>
            <Switch>
              <Route path="/resources">
                <ResourcesPage/>
              </Route>
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
    </ErrorBoundary>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
