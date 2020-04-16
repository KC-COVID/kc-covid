import { geo_service } from '../services/geo_service';

const getCookieParams = () => {
    return document.cookie.split(';').reduce((cookieObject, cookieString) => {
        let splitCookie = cookieString.split('=')
        try {
        cookieObject[splitCookie[0].trim()] = decodeURIComponent(splitCookie[1])
        } catch (error) {
        cookieObject[splitCookie[0].trim()] = splitCookie[1]
        }
        return cookieObject
    }, []);
};

export const setGeoDataCookies = (geo_data) => {
    if(geo_data) {
        
      // cookies to write if available in response data
      let cookie_params = ['zipcode', 'latitude', 'longitude'];

      cookie_params.forEach(value => {
        if(geo_data[value]) {
          document.cookie = `user_${value}=${geo_data[value]}`;
        }
      });
    }
};

export const configGeoDataProps = (geo_data) => {
    return new Promise(function (resolve, reject) {
        let geo_data_props = {};

        if(geo_data.coords && geo_data.coords.latitude && geo_data.coords.longitude) {
            geo_data_props.latitude = geo_data.coords.latitude;
            geo_data_props.longitude = geo_data.coords.longitude;

            geo_service.getZipCodeByLatLong(geo_data_props.latitude + ', ' + geo_data_props.longitude)
            .then(zipcode => {
                geo_data_props.zipcode = zipcode;
                resolve(geo_data_props);
            })
            .catch(err => {
                reject(err);
            });
        }
        else if (geo_data.user_zipcode && geo_data.user_latitude && geo_data.user_longitude) {
            geo_data_props.latitude  = parseFloat(geo_data.user_latitude);
            geo_data_props.longitude = parseFloat(geo_data.user_longitude);
            geo_data_props.zipcode = geo_data.user_zipcode;
            resolve(geo_data_props);
        }
        else {
            reject('geo data is missing usuable properties');
        }
    });
}

export const setGeoData = (geo_data=null) => {
    const geo_data_props = configGeoData(geo_data);
    setCookieParams(geo_data_props);
};

export const fetchGeoData = () => {
    return new Promise(function (resolve, reject) {

        // query cookies for geo data
        const cookie_values = getCookieParams();

        if(cookie_values.user_zipcode && cookie_values.user_latitude && cookie_values.user_longitude) {
            resolve(cookie_values);
        }
        else if("geolocation" in navigator) {
            // query user for location data
            navigator.geolocation.getCurrentPosition(resolve, reject);
        } 
        else {
            reject('Geolocation API not supported in this browser.');
        }
    });
}