import { geoService } from '../services/geoService';

const getCookieParams = () => document.cookie.split(';').reduce((cookieObject, cookieString) => {
  const splitCookie = cookieString.split('=');
  try {
    cookieObject[splitCookie[0].trim()] = decodeURIComponent(splitCookie[1]);
  } catch (error) {
    cookieObject[splitCookie[0].trim()] = splitCookie[1];
  }
  return cookieObject;
}, []);

export const setGeoDataCookies = (geoData) => {
  if (geoData) {
    // cookies to write if available in response data
    const cookie_params = ['zipcode', 'latitude', 'longitude'];

    cookie_params.forEach((value) => {
      if (geoData[value]) {
        document.cookie = `user_${value}=${geoData[value]}`;
      }
    });
  }
};

export const configGeoDataProps = (geoData) => new Promise(((resolve, reject) => {
  const geoDataProps = {};

  if (geoData.coords && geoData.coords.latitude && geoData.coords.longitude) {
    geoDataProps.latitude = geoData.coords.latitude;
    geoDataProps.longitude = geoData.coords.longitude;

    geoService.getZipCodeByLatLong(`${geoDataProps.latitude}, ${geoDataProps.longitude}`)
      .then((zipcode) => {
        geoDataProps.zipcode = zipcode;
        resolve(geoDataProps);
      })
      .catch((err) => {
        reject(err);
      });
  } else if (geoData.user_zipcode && geoData.user_latitude && geoData.user_longitude) {
    geoDataProps.latitude = parseFloat(geoData.user_latitude);
    geoDataProps.longitude = parseFloat(geoData.user_longitude);
    geoDataProps.zipcode = geoData.user_zipcode;
    resolve(geoDataProps);
  } else {
    reject('geo data is missing usuable properties');
  }
}));

export const setGeoData = (geoData = null) => {
  const geoDataProps = configGeoData(geoData);
  setCookieParams(geoDataProps);
};

export const fetchGeoData = () => new Promise(((resolve, reject) => {
  // query cookies for geo data
  const cookieValues = getCookieParams();

  if (cookieValues.user_zipcode && cookieValues.user_latitude && cookieValues.user_longitude) {
    resolve(cookieValues);
  } else if ('geolocation' in navigator) {
    // query user for location data
    navigator.geolocation.getCurrentPosition(resolve, reject);
  } else {
    reject('Geolocation API not supported in this browser.');
  }
}));
