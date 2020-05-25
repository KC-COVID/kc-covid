import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import fetchLocalResourceData from '../../services/resourcesService';

import DonationMarkerIcon from '../../assets/markers/dark-blue-marker.svg';
import RequestMarkerIcon from '../../assets/markers/purple-marker.svg';

export const coordinatePropType = {
  /**
   * The latitude of the coordinate
   */
  lat: PropTypes.number,

  /**
   * The longitude of the coordinate
   */
  lng: PropTypes.number,
};

const propTypes = {
  /**
   * The center of the map.
   */
  center: coordinatePropType,
};

const MapComponent = ({ center }) => {
  const zoom = 12;
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchLocalResourceData().then((data) => {
      if (data.donations) {
        setDonations(data.donations);
      }

      if (data.resources) {
        setRequests(data.resources);
      }
    });
  }, []);

  const buildLatLng = (lat, lng) => ({ lat: Number(lat), lng: Number(lng) });

  return (
    <GoogleMap defaultZoom={zoom} center={center}>
      {donations.map((donation) => {
        const position = buildLatLng(donation.latitude, donation.longitude);
        return <Marker key={donation.timestamp} icon={DonationMarkerIcon} position={position} />;
      })}
      {requests.map((request) => {
        const position = buildLatLng(request.latitude, request.longitude);
        return <Marker key={request.UID} icon={RequestMarkerIcon} position={position} />;
      })}
    </GoogleMap>
  );
};

MapComponent.propTypes = propTypes;
export default withScriptjs(withGoogleMap(MapComponent));
