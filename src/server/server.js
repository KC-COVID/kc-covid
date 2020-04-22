import path from 'path';
import express from 'express';
import Airtable from 'airtable';
import * as keys from '../../keys.json';

Airtable.configure({ apiKey: keys.apiKey });
const app = express();
const DIST_DIR = __dirname;
const HTML_FILE = path.join(DIST_DIR, 'index.html');

// airtable
const RESOURCES_TABLE = 'Community Resources';
const resourceFieldsToGet = ['UID', 'Type', 'ReviewStatus', 'Address Line 1', 'Address Line 2', 'City', 'State', 'ZIP', 'Phone Number', 'Email address'];
const tableFilter = 'AND({ReviewStatus} != "Rejected", {ReviewStatus} != "Deprecated")';

/**
 * Builds a workable field from the airtable response
 * @param existingField {Object} A JSON object containing the resource field information.
 * @returns {Object} The parsed JSON object
 */
function buildResouce(existingField) {
  return (
    {
      uid: existingField.UID,
      type: existingField.type,
      reviewStatus: existingField.ReviewStatus,
      addressLine1: existingField['Address Line 1'],
      addressLine2: existingField['Address Line 1'],
      city: existingField.City,
      state: existingField.State,
      zip: existingField.ZIP,
      phoneNumber: existingField['Phone Number'],
      email: existingField['Email address'],
    }
  );
}


app.use(express.static(DIST_DIR));

// Gets the resources currently available
app.get('/data/resources', (req, res) => {
  const airTableResposes = [];
  const base = new Airtable().base(keys.resourcesBaseId);

  // Callback to handle each page of records retrieved
  const eachPageCallback = (records, fetchNextPage) => {
    records.forEach((record) => {
      const newField = buildResouce(record.fields);
      airTableResposes.push(newField);
    });

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
});
