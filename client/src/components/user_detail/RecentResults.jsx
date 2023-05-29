import React, { useContext, useEffect, useState } from "react";
import GameResult from "./GameResult";
import { DataContext } from "../../context/DataContext";

function RecentResults({opponent}) {

  const {selectedUser, matches} = useContext(DataContext);
  const [matchesVsOpponent, setMatchesVsOpponent] = useState([]);

  useEffect(() => {
      
    const allUserMatches = matches.filter(m => m.player1_id === selectedUser || m.player2_id === selectedUser);
    setMatchesVsOpponent(opponent === 'all' ?
      allUserMatches :
      allUserMatches.filter(m => m.player1_id === opponent || m.player2_id === opponent))

  }, [selectedUser, matches, opponent])

  return (
    <>
      { matchesVsOpponent.map(m => (<GameResult key={m.id} game={m}/>) )}
    </>
  )
}

export default RecentResults;
