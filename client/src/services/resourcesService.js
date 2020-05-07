import axios from 'axios';

function fetchLocalResourceData() {
  console.log('Retriving resources');
  return new Promise((resolve, reject) => {
    axios.get('/data/resources')
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => { reject(err); });
  });
}

export default fetchLocalResourceData;
