import NodeGeocoder from 'node-geocoder';
import readKeys from './readKeys';

const geocodeOptions = { provider: 'google', apiKey: readKeys().googleApiKey };
const geocoder = NodeGeocoder(geocodeOptions);

export const RESOURCES_TABLE = 'Community Resources';
export const resourcesTableFilter = '{ReviewStatus} = "Approved"';
export const resourceFieldsToGet = [
  'UID',
  'name',
  'website',
  'description',
  'type',
  'reviewStatus',
  'restrictions',
  'addressLine1',
  'addressLine2',
  'city',
  'state',
  'zip',
  'phoneNumber',
  'emailAddress',
];

/**
 * Builds the response for retrieving resources from airtable. Attempts to asynchronously get the latitude and longitude
 * for the resource.
 * @param resource The resource to build a response for (Required).
 * @return {Promise} The promsie that will return the parsed resource object on resolving.
 */
export async function buildResouceResponse(resource) {
  if (!resource) {
    return null;
  }
  try {
    const geocode = await geocoder.geocode({
      address: resource.addressLine1,
      country: 'USA',
      zipcode: resource.zip,
    });

    if (geocode && geocode[0]) {
      return { ...resource, latitude: geocode[0].latitude, longitude: geocode[0].longitude };
    }
    return resource;
  } catch (error) {
    console.log(`Error trying to build resource with UID ${resource ? resource.UID : 'NULL'}. \n Error message: ${error.message} \n Throwing out.`);
    return null;
  }
}
