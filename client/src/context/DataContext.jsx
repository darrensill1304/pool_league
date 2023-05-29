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
    // Load data from JSON files when the component mounts
    // const loadedUsers = loadDataFromFile('./data/Users.json');
    // const loadedMatches = loadDataFromFile('./data/Matches.json');
    // const loadedRatingHistory = loadDataFromFile('./data/RatingHistory.json');
    //
    // setUsers(loadedUsers || usersData);
    // setMatches(loadedMatches || matchesData);
    // setRatingHistory(loadedRatingHistory || ratingHistoryData);
    isLoadingData = true; 
    fetchAllData()
    .then((data) => {
        setUsers(data.users)
        setMatches(data.matches)
        setRatingHistory(data.ratingHistory)
      })
      .catch((error) => {
        console.log(error);
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

