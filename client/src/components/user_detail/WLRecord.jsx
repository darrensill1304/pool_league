import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { Typography } from "@mui/material";

function WLRecord({opponent}) {

  const {selectedUser, matches} = useContext(DataContext);
  const [userMatches, setUserMatches] = useState([]);

  useEffect(() => {
    setUserMatches(matches.filter((m) => { return (m.player1_id === selectedUser) || (m.player2_id === selectedUser) }));
  }, [selectedUser, matches])


  const getAllMatches = () => {
      return opponent === 'all' ? 
      userMatches : 
      userMatches.filter(m => m.player1_id === opponent || m.player2_id === opponent);
  }

  const getNumWins = () => {
    return getAllMatches().filter(m => m.winner_id === selectedUser).length;
  }

  const getNumLoss = () => {
    return getAllMatches().filter(m => m.winner_id !== selectedUser).length;
  }

  return (

    <Typography>
      <span style={{color: 'green'}}>{getNumWins()} W </span>
      <span style={{color: 'red'}}>{getNumLoss()} L</span>
    </Typography>
  
  )
}

export default WLRecord;
