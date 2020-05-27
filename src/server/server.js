import path from 'path';
import express from 'express';
import Airtable from 'airtable';

import readKeys from './readKeys';
import {
  buildResouceResponse,
  parseResourceRequest,
  resourceFieldsToGet,
  resourcesTableFilter,
  RESOURCES_TABLE,
} from './resourceHelper';

const app = express();
const DIST_DIR = __dirname;
const HTML_FILE = path.join(DIST_DIR, '../client/dist/index.html');

app.use(express.static(path.join(DIST_DIR, '../client/dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Gets the resources currently available
app.get('/data/resources', (req, res) => {
  const keys = readKeys();
  const base = new Airtable().base(keys.resourcesBaseId);

  const selectCriteria = { fields: resourceFieldsToGet, filterByFormula: resourcesTableFilter };

  base(RESOURCES_TABLE).select(selectCriteria).all()
    .then((responses) => {
      const responsePromises = responses.map((response) => buildResouceResponse(response.fields));
      // Because geocoding returns a promise we have to await, buildResourceResponse also returns a promise, so we
      // have to wait for all of those to be completed before sending our response.
      Promise.all(responsePromises).then((parsedResponses) => {
        res.send({ resources: parsedResponses });
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(422).end();
    });
});

app.post('/data/resources', (req, res) => {
  const keys = readKeys();
  const base = new Airtable().base(keys.resourcesBaseId);

  const parsedResource = parseResourceRequest(req.body);
  if (!parsedResource) {
    res.status(422).end();
  }

  base(RESOURCES_TABLE).create(parsedResource)
    .then(() => res.status(200).end())
    .catch((error) => {
      console.log(error);
      res.status(422).end();
    });
});

app.get('*', (req, res) => {
  res.sendFile(HTML_FILE);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`);
  console.log('Press Ctrl+C to quit.');
  const keys = readKeys();

  Airtable.configure({ apiKey: keys.airtableApiKey });
});
