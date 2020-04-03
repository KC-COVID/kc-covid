import React, { Fragment } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';

import './HomePage.scss';
import logo from '../assets/KCCovid_stacked_color.png';

/**
 * The header present in the home page to show off the logo and main title. This is separate from the header that
 * controls site navigation.
 */
const HomeHeader = () => (
  <Row>
    <Col>
      <img src={logo} alt="The logo for KC-Covid" style={{ maxWidth: '100%' }} className="header-logo" />
      <h1>Kansas City `&#39;`s Covid Assistance</h1>
    </Col>
  </Row>
);

/**
 * A reusable section for displaying the social media links for kc-covid.
 */
const SocialMediaSection = () => (
  <Row>
    <Col>
      <h3>Follow us on social media for quick updates</h3>
      <div className="social-links">
        <SocialIcon className="social-icon" url="https://twitter.com/kccovid" />
        <SocialIcon className="social-icon" url="https://www.facebook.com/groups/1596299170524391/" />
      </div>
    </Col>
  </Row>
);

/**
 * The Home page for the application. Shows the different places the user can go, social media links, and the logo.
 */
function HomePage() {
  const history = useHistory();

  return (
    <Fragment>
      <HomeHeader />
      <Row>
        <Col>
          <h2>What are you here for?</h2>
        </Col>
      </Row>
      <Row>
        <Col md={4} xs={12} style={{ marginBottom: '4px' }}>
          <Button id="volunteer-button" variant="primary" block onClick={() => history.push('/volunteer')}>Volunteer</Button>
        </Col>
        <Col md={4} xs={12} style={{ marginBottom: '4p' }}>
          <Button id="aid-button" variant="primary" block onClick={() => history.push('/aid')}>Request Aid</Button>
        </Col>
        <Col md={4} xs={12} style={{ marginBottom: '4px' }}>
          <Button id="supplies-button" variant="primary" block onClick={() => history.push('/submit')}>Offer Supplies</Button>
        </Col>
      </Row>
      <SocialMediaSection />
    </Fragment>
  );
}

export default HomePage;
