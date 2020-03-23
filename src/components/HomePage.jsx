import React, { Fragment } from 'react';
import { SocialIcon } from 'react-social-icons';

import logo from '../logo.svg';
import './HomePage.scss';

const HomeHeader = () => (
  <div className="homepage-header">
    <h1>Some text to put in the header</h1>
  </div>
);

const SocialMediaSection = () => (
  <div className="social-media-section">
    <h3>Follow us on social media for quick updates </h3>
    <div className="social-links">
      <SocialIcon className="social-icon" url="https://twitter.com/QuintonLucasKC" />
      <SocialIcon className="social-icon" url="https://twitter.com/QuintonLucasKC" />
    </div>
  </div>
);

// TODO make home page
// TODO add social accounts
function HomePage() {
  // SocialIcon automatically pulls the icon from the url or you can specify it
  return (
    <Fragment>
      <HomeHeader />
      <div>
        <h2>Title for explaining what we do</h2>
        <p>Here is a long paragraph that we will one day need to translate because it\'s only in english and thats a bad because other people don\'t always speak english and we also want to help them.</p>
      </div>
      <SocialMediaSection />
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
