import path from 'path';
import express from 'express';
import Airtable from 'airtable';
import { readFileSync } from 'fs';

const app = express();
const DIST_DIR = __dirname;
const HTML_FILE = path.join(DIST_DIR, 'index.html');

// airtable
const RESOURCES_TABLE = 'Community Resources';
const resourceFieldsToGet = [
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
const tableFilter = '{ReviewStatus} = "Approved"';

/**
 * Opens the keys file and parses the JSON from it.
 * @returns JSON The json from the keys file.
 */
function readKeys() {
  return JSON.parse(readFileSync('keys.json'));
}

app.use(express.static(DIST_DIR));

// Gets the resources currently available
app.get('/data/resources', (req, res) => {
  const airTableResposes = [];
  const keys = readKeys();
  const base = new Airtable().base(keys.resourcesBaseId);

  // Callback to handle each page of records retrieved
  const eachPageCallback = (records, fetchNextPage) => {
    records.forEach((record) => { airTableResposes.push(record.fields); });

    fetchNextPage();
  };

  // Callback to handle a finished call to airtable or a failure from the retrieval
  const doneCallback = (error) => {
    if (error) {
      console.log(error);
      res.status(422).end();
    } else {
      res.send(airTableResposes);
    }
  };

  base(RESOURCES_TABLE).select({ fields: resourceFieldsToGet, filterByFormula: tableFilter }).eachPage(eachPageCallback, doneCallback);
});

app.get('*', (req, res) => {
  res.sendFile(HTML_FILE);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`);
  console.log('Press Ctrl+C to quit.');
  const keys = readKeys();
  Airtable.configure({ apiKey: keys.apiKey });
});
