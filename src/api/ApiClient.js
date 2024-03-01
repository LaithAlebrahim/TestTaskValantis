// src/api/ApiClient.js
import axios from 'axios';
import md5 from 'md5';

const PASSWORD = 'Valantis';
const BASE_URL = 'https://api.valantis.store:41000/';

const generateAuthHeader = () => {
  const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const hash = md5(`${PASSWORD}_${timestamp}`);
  return { 'X-Auth': hash };
};

const apiClient = axios.create({
  baseURL: BASE_URL,
});

const getIds = async (offset, limit) => {
  const response = await apiClient.post('', {
    action: 'get_ids',
    params: { offset, limit },
  }, { headers: generateAuthHeader() });
  return response.data.result;
};

const getItems = async (ids) => {
  const response = await apiClient.post('', {
    action: 'get_items',
    params: { ids },
  }, { headers: generateAuthHeader() });
  return response.data.result;
};

const filterProducts = async (filters) => {
  try {
    const response = await apiClient.post('', {
      action: 'filter',
      params: filters,
    }, { headers: generateAuthHeader() });
    console.log(response)
    return response.data.result; // Returns IDs of matching products
  } catch (error) {
    console.error('Filtering error:', error);
    throw error;
  }
};

export { getIds, getItems, filterProducts };
