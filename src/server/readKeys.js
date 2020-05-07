import { readFileSync } from 'fs';

/**
 * Opens the keys file and parses the JSON from it.
 * @returns JSON The json from the keys file.
 */
export default () => JSON.parse(readFileSync('keys.json'));
