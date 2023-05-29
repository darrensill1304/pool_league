import React, { createContext, useState, useEffect } from 'react';
import { fetchAllData, updateMatches, updateRatingHistory, updateUsers } from '../utilities/DataAPIs';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [matches, setMatches] = useState([]);
  const [ratingHistory, setRatingHistory] = useState([]);

  let isLoadingData = false;

  useEffect(() => {
    isLoadingData = true; 
    fetchAllData()
    .then((data) => {
        setUsers(data.users)
        setMatches(data.matches)
        setRatingHistory(data.ratingHistory)
        isLoadingData = false
      })
      .catch((error) => {
        console.log(error);
        isLoadingData = false;
      })
  }, []);

  useEffect(() => {
    if (isLoadingData) return;
    updateUsers(users)
      .then((res) => { console.log('Update Users Response: ' + res) })
      .catch((err) => { console.log(err) })
  }, [users]);

  useEffect(() => {
    if (isLoadingData) return;
    updateMatches(matches)
      .then((res) => { console.log('Update Matches Response: ' + res) })
      .catch((err) => { console.log(err) })
  }, [matches]);

  useEffect(() => {
    if (isLoadingData) return;
    updateRatingHistory(ratingHistory)
      .then((res) => { console.log('Update RatingHistory Response: ' + res) })
      .catch((err) => { console.log(err) })
  }, [ratingHistory]);


  return (
    <DataContext.Provider value={{ users, setUsers, selectedUser, setSelectedUser, matches, setMatches, ratingHistory, setRatingHistory }}>
      {children}
    </DataContext.Provider>
  );
};

