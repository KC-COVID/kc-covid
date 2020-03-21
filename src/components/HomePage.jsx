import React, { Fragment } from 'react';
import { SocialIcon } from 'react-social-icons';
import logo from '../logo.svg';

// ? Could just combine into home page because i mean it's not much
const HomeHeader = () => (
  <div className="homepage-header">
    <SocialIcon url="https://twitter.com/QuintonLucasKC" />
    <h3>Some text to put in the header</h3>
    <SocialIcon url="https://twitter.com/QuintonLucasKC" style={{ height: 25, width: 25 }} />
  </div>
);

// TODO make home page
// TODO add social accounts
function HomePage() {
  // SocialIcon automatically pulls the icon from the url or you can specify it
  return (
    <Fragment>
      <HomeHeader />
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </div>
    </Fragment>
  );
}

export default HomePage;
