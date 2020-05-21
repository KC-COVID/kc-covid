import { readFileSync, existsSync } from 'fs';

/**
 * If the key file exists, opens the keys file and parses the JSON from it.
 * else, load values from heroku configurations (used for heroku deployed site)
 * @returns JSON The json from the keys file.
 */
export default () => {
     if(existsSync('keys.json')){
       return JSON.parse(readFileSync('keys.json'));
     }
     else {
       console.log('loading keys from heroku config');
       var keys = {};
       keys.airtableApiKey = process.env.airtableApiKey;
       keys.resourcesBaseId = process.env.resourcesBasesId;
       return keys;
   }}
