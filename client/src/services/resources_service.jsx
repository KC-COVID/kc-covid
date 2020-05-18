import axios from 'axios';

class ResourceService {
    fetchLocalResourceData() {
        return new Promise((resolve, reject) => {
            axios.get('/data/resources.json')
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => { reject(err) });
        });
    }
}

export const resource_service = new ResourceService();