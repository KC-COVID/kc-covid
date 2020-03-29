import React from 'react';

import { Row, Col } from 'react-bootstrap';
import { SocialIcon } from 'react-social-icons';

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

export default SocialMediaSection;
