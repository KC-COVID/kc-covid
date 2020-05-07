import axios from 'axios';
import { GoogleMapsAPIKey } from '../../private/google_maps';

const GEODATA_API = 'https://maps.googleapis.com/maps/api/geocode/json';

class GeoService {
  fetchGeoDataByZipCode(zipcode) {
    return new Promise((resolve, reject) => {
      axios.get(`${GEODATA_API}?address=${zipcode}&key=${GoogleMapsAPIKey}`)
        .then((res) => {
          const location_data = (res.data.results.length && res.data.results[0].hasOwnProperty('geometry')) ?
            res.data.results[0].geometry.location :
            {};

          resolve(location_data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getZipCodeByLatLong(lat_lng) {
    return new Promise((resolve, reject) => {
      axios.get(`${GEODATA_API}?latlng=${lat_lng}&key=${GoogleMapsAPIKey}`)
        .then((res) => {
          const location_data_array = (res.data.results.length && res.data.results[0].hasOwnProperty('address_components')) ?
            res.data.results[0].address_components :
            null;

          if (location_data_array) {
            const zipcode_props = location_data_array.find((data) => data.types.includes('postal_code'));

            resolve(zipcode_props.long_name);
          } else {
            reject('zipcode not found in successful geo data api call');
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export const geo_service = new GeoService();
