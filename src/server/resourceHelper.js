import NodeGeocoder from 'node-geocoder';
import readKeys from './readKeys';

const geocodeOptions = { provider: 'google', apiKey: readKeys().googleApiKey };
const geocoder = NodeGeocoder(geocodeOptions);

const emailRegex = /^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$/;

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

/**
 * Parses the request to add a new resource and builds it into something useable by the Airtable API.
 * @param requestBody The request body to parse (Required).
 * @return {Object} The parsed body to be used by Airtable or null if a required validation failed.
 */
export function parseResourceRequest(requestBody) {
  const fields = {};
  if (!requestBody.name) {
    console.log('Attempted to add a resource with no name');
    return null;
  }
  fields.name = requestBody.name;
  fields.reviewStatus = 'Pending';
  fields.website = requestBody.website;
  fields.description = requestBody.description;
  fields.restrictions = requestBody.restrictions;
  fields.addressLine1 = requestBody.addressLine1; // TODO validate
  fields.addressLine2 = requestBody.addressLine2; // TODO validate
  fields.city = requestBody.city; // TODO validate
  fields.state = requestBody.state; // TODO validate
  fields.zip = requestBody.zip; // TODO validate

  if (emailRegex.test(requestBody.emailAddress)) {
    fields.emailAddress = requestBody.emailAddress;
  }
  fields.phoneNumber = requestBody.phoneNumber;

  if (!fields.phoneNumber && !fields.emailAddress) {
    console.log(`Request being added with name: ${fields.name} has no contact information.`);
    return null;
  }
  // TODO types?
  // TODO hours

  return [JSON.stringify({ fields })];
}
