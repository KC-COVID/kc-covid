import React, { Fragment } from 'react';
import { SocialIcon } from 'react-social-icons';

import './HomePage.scss';
import { Row, Col } from 'react-bootstrap';

const HomeHeader = () => (
  <Row>
    <Col>
      <h1>Some text to put in the header</h1>
    </Col>
  </Row>
);

const SocialMediaSection = () => (
  <Row>
    <Col>
      <h3>Follow us on social media for quick updates </h3>
      <div className="social-links">
        <SocialIcon className="social-icon" url="https://twitter.com/QuintonLucasKC" />
        <SocialIcon className="social-icon" url="https://twitter.com/QuintonLucasKC" />
      </div>
    </Col>
  </Row>
);

// TODO make home page
// TODO add social accounts
function HomePage() {
  // SocialIcon automatically pulls the icon from the url or you can specify it
  return (
    <Fragment>
      <HomeHeader />
      <Row>
        <Col>
          <h2>Title for explaining what we do</h2>
          <p>Here is a long paragraph that we will one day need to translate because it\'s only in english and thats a bad because other people don\'t always speak english and we also want to help them.</p>
        </Col>
      </Row>
      <SocialMediaSection />
    </Fragment>
  );
}

export default HomePage;
