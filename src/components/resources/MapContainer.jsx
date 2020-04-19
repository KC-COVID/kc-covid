import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import { GoogleMapsAPIKey } from '../../../private/google_maps';
import { withRouter } from 'react-router-dom';

const MapComponent = (withScriptjs(withGoogleMap(({ center }) => {
    const zoom = 13;

    return (
        <GoogleMap
            defaultZoom={zoom}
            center={center}>
        </GoogleMap>
    );
})));

const MapContainer = ({ center }) => {
    return (
        <MapComponent
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GoogleMapsAPIKey}`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100vh` }} />}
            center={center}
        />
    );
}

export default withRouter(MapContainer);