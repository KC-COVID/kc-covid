import React, { useEffect, useState } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { GoogleMapsAPIKey } from '../../private/GoogleMaps';
import { withRouter } from 'react-router-dom';
import { resource_service } from '../../services/resources_service';

// marker images
import DonationMarkerIcon from '../../assets/markers/blue_marker.svg';
import RequestMarkerIcon from '../../assets/markers/purple_marker.svg';

const MapComponent = (withScriptjs(withGoogleMap(({ center }) => {
    const zoom = 12;
    const [ donations, setDonations ] = useState([]);
    const [ requests, setRequests ] = useState([]);

    useEffect(() => {
        resource_service.fetchLocalResourceData().then(data => {
            if(data.hasOwnProperty('donations') && data.hasOwnProperty('requests')) {
                setDonations(data.donations);
                setRequests(data.requests);
            }
        });
    }, [donations.length, requests.length]);

    const formatLatLong = ({ lat, lng }) => {
        return {
            lat: Number(lat),
            lng: Number(lng)
        }
    }

    return (
        <GoogleMap
            defaultZoom={zoom}
            center={center}>
            {donations.map(donation => {
                const position = formatLatLong(donation);
                return <Marker
                            key={donation.timestamp}
                            icon={DonationMarkerIcon}
                            position={position}>
                        </Marker>
            })}
            {requests.map(request => {
                const position = formatLatLong(request);
                return <Marker
                            key={request.timestamp}
                            icon={RequestMarkerIcon}
                            position={position}>
                        </Marker>
            })}
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