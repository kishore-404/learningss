// src/api.ts
import axios from 'axios';

const apiBase = import.meta.env.VITE_API_URL; 

export const getDummyData = async () => {
  try {
    const response = await axios.get(`${apiBase}`);
    return response.data[2];
  } catch (error) {
    console.error('Error fetching dummy data:', error);
    throw error;
  }
};
