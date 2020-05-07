import React from 'react';
import { withRouter } from 'react-router-dom';

import { GoogleMapsAPIKey } from '../../../private/google_maps';
import MapComponent, { coordinatePropType } from './MapComponent';

const propTypes = {
  /**
   * The center of the map.
   */
  center: coordinatePropType,
};

const MapContainer = ({ center }) => (
  <MapComponent
    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GoogleMapsAPIKey}`}
    loadingElement={<div style={{ height: '100%' }} />}
    containerElement={<div style={{ height: '100%' }} />}
    mapElement={<div style={{ height: '100vh' }} />}
    center={center}
  />
);

MapContainer.propTypes = propTypes;
export default withRouter(MapContainer);
