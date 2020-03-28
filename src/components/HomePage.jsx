import React, { Fragment } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';

import './HomePage.scss';
import logo from '../assets/KCCovid_stacked_color.png';

const HomeHeader = () => (
  <Row>
    <Col>
      <img src={logo} style={{ maxWidth: '100%' }} className="header-logo" />
      <h1>Kansas City's Covid Assistance</h1>
    </Col>
  </Row>
);

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

// TODO route
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
          <Button variant="primary" block onClick={() => history.push('/volunteer')}>Volunteer</Button>
        </Col>
        <Col md={4} xs={12} style={{marginBottom: '4p'}}>
          <Button variant="primary" block onClick={() => history.push('/aid')}>Request Aid</Button>
        </Col>
        <Col md={4} xs={12} style={{marginBottom: '4px' }}>
          <Button variant="primary" block onClick={() => history.push('/submit')}>Offer Supplies</Button>
        </Col>
      </Row>
      <SocialMediaSection />
    </Fragment>
  );
}

export default HomePage;
