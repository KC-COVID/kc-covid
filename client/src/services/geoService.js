import axios from 'axios';
import { GoogleMapsAPIKey } from '../../private/google_maps';

const GEODATA_API = 'https://maps.googleapis.com/maps/api/geocode/json';

class GeoService {
  fetchGeoDataByZipCode(zipcode) {
    return new Promise((resolve, reject) => {
      axios.get(`${GEODATA_API}?address=${zipcode}&key=${GoogleMapsAPIKey}`)
        .then((res) => {
          const locationData = (res.data.results.length && res.data.results[0].hasOwnProperty('geometry')) ?
            res.data.results[0].geometry.location :
            {};

          resolve(locationData);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getZipCodeByLatLong(latlng) {
    return new Promise((resolve, reject) => {
      axios.get(`${GEODATA_API}?latlng=${latlng}&key=${GoogleMapsAPIKey}`)
        .then((res) => {
          const locationDataArray = (res.data.results.length && res.data.results[0].hasOwnProperty('address_components')) ?
            res.data.results[0].address_components :
            null;

          if (locationDataArray) {
            const zipcodeProps = locationDataArray.find((data) => data.types.includes('postal_code'));

            resolve(zipcodeProps.long_name);
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

export const geoService = new GeoService();
