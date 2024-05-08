import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://maps.googleapis.com', // Base URL of the API
  headers: {
    'Access-Control-Allow-Origin': '*', // Allow requests from any origin
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', // Allow specific HTTP methods
    'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Authorization', // Allow specific headers
    'Content-Type': 'application/json', // Set Content-Type header to JSON
  },
});

export default axiosInstance;s