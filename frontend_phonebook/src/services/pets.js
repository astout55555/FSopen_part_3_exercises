// added for the dynamicapp part of the VPS project
// just want to retrieve the data

import axios from 'axios';

const baseUrl = '/api/pets';

const getPets = () => {
  const request = axios.get(`${baseUrl}`);
  return request.then(response => {
    return response.data
  });
}

export default {
  getPets,
}
