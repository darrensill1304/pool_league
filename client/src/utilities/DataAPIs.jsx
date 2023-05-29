import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

// Fetch all data
export const fetchAllData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/data`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Update Users table
export const updateUsers = async (users) => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, { users: users });
    return response.data;
  } catch (error) {
    console.error('Error updating Users table:', error);
    throw error;
  }
};

// Update Matches table
export const updateMatches = async (matches) => {
  try {
    const response = await axios.post(`${BASE_URL}/matches`, { matches: matches });
    return response.data;
  } catch (error) {
    console.error('Error updating Matches table:', error);
    throw error;
  }
};

// Update Rating History table
export const updateRatingHistory = async (ratingHistory) => {
  try {
    const response = await axios.post(`${BASE_URL}/rating-history`, { ratingHistory: ratingHistory });
    return response.data;
  } catch (error) {
    console.error('Error updating Rating History table:', error);
    throw error;
  }
};

