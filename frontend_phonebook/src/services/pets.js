// added for the dynamicapp part of the VPS project
// just want to retrieve the data

import axios from 'axios';

const baseUrl = '/api/pets';

const getPets = () => {
  console.log('about to get pets from /api/pets');
  const request = axios.get(`${baseUrl}`);
  console.log('request initiated');
  try {
    return request.then(response => {
      console.log(response);
      return response.data
    });
  } catch (error) {
    console.error(error);
  }
}

export default {
  getPets,
}
