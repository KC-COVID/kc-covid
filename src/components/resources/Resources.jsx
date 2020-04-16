import React, { useEffect, useState } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import MapContainer from './MapContainer';
import { geo_service } from '../../services/geo_service';
import { fetchGeoData, configGeoDataProps, setGeoDataCookies } from '../../utilities/geo_utilities';

const Resources = () => {
    const [ zipcode, setZipCode ] = useState(64111);
    const [ mapCenter, setMapCoordinates ] = useState({lat: 39.048010, lng: -94.602000});

    useEffect(() => {
        fetchGeoData().then(geo_data => {
            configGeoDataProps(geo_data).then(geo_data_props => {
                const lat_lng = {lat: geo_data_props.latitude, lng: geo_data_props.longitude};

                setMapCoordinates(lat_lng);
                setZipCode(geo_data_props.zipcode);
                setGeoDataCookies(geo_data_props);
            });
        });
    },[]);

    const setMapCenterWithZipCode = (zipcode) => {
        const isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipcode);

        if(isValidZip) { 
            geo_service.fetchGeoDataByZipCode(zipcode).then(lat_lng => {
                if(lat_lng.hasOwnProperty('lat') && lat_lng.hasOwnProperty('lng')) {
                    setMapCoordinates(lat_lng);
                    setGeoDataCookies({
                        latitude: lat_lng.lat, 
                        longitude: lat_lng.lng, 
                        zipcode: zipcode
                    });
                }
            });
        }
        setZipCode(zipcode); 
    }

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
                                onChange={(e) => setMapCenterWithZipCode(e.target.value)}/>
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