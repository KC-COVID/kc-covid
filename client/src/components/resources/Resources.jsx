import React, { useEffect, useState } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import MapContainer from './MapContainer';
import { geoService } from '../../services/geoService';
import { fetchGeoData, configGeoDataProps, setGeoDataCookies } from '../../utilities/geoUtilities';

const Resources = () => {
  const [zipcode, setZipCode] = useState(64111);
  const [mapCenter, setMapCoordinates] = useState({ lat: 39.048010, lng: -94.602000 });

  useEffect(() => {
    fetchGeoData().then((geoData) => {
      configGeoDataProps(geoData).then((geoDataProps) => {
        const latLng = { lat: geoDataProps.latitude, lng: geoDataProps.longitude };

        setMapCoordinates(latLng);
        setZipCode(geoDataProps.zipcode);
        setGeoDataCookies(geoDataProps);
      });
    });
  }, []);

  const setMapCenterWithZipCode = (newZipcode) => {
    const isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(newZipcode);

    if (isValidZip) {
      geoService.fetchGeoDataByZipCode(newZipcode).then((latLng) => {
        if (latLng.hasOwnProperty('lat') && latLng.hasOwnProperty('lng')) {
          setMapCoordinates(latLng);
          setGeoDataCookies({ latitude: latLng.lat, longitude: latLng.lng, newZipcode });
        }
      });
    }
    setZipCode(newZipcode);
  };

  return (
    <div id="resources_page" className="row">
      <section className="col-12 col-lg-4" id="side_panel_container">
        <div className="row">
          <div className="col-12">
            <h1>Zip Code</h1>
            <InputGroup size="sm" className="my-3">
              <FormControl
                aria-label="zipcode lookup"
                value={zipcode}
                onChange={(e) => setMapCenterWithZipCode(e.target.value)}
              />
            </InputGroup>
          </div>
        </div>
      </section>
      <section className="col-12 col-lg-8" id="map_container">
        <MapContainer center={mapCenter} />
      </section>
    </div>
  );
};

export default Resources;
