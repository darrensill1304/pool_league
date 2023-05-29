import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../context/DataContext';
import { Alert, Button, Collapse, FormControl, FormControlLabel, FormLabel, IconButton, InputLabel, MenuItem, Radio, RadioGroup, Select, Typography } from '@mui/material';
import { findFreeId } from '../utilities/ObjectUtils';
import { Close } from '@mui/icons-material';

function NewResultForm() {

  const {users, setUsers, matches, setMatches, ratingHistory, setRatingHistory} = useContext(DataContext);

  const [player1Options, setPlayer1Options] = useState([]);
  const [player2Options, setPlayer2Options] = useState([]);

  const [player1Id, setPlayer1Id] = useState('');
  const [player2Id, setPlayer2Id] = useState('');
  const [winner, setWinner] = useState('player1');

  const [alertMsg, setAlertMsg] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const createUserOption = (user) => {
    return {
        id: user.id,
        label: `${user.name} (${user.current_rating})`
    }
  }

  useEffect(() => {

    const allUsers = users.map(u => { return createUserOption(u); })
    setPlayer1Options(allUsers);

  }, [users]);

  useEffect(() => {
    const allUsers = users.map(u => { return createUserOption(u); })
    const filteredUsers = allUsers.filter(u => u.id != player1Id);

    setPlayer2Options(filteredUsers);
  }, [player1Id]);

  const handlePlayer1Selection = (event) => {
    setPlayer1Id(event.target.value);
  }

  const handlePlayer2Selection = (event) => {
    setPlayer2Id(event.target.value);
  }

  const handleWinnerSelect = (event) => {
    setWinner(event.target.value);
  }

  const updateUserScore = (user1, diff1, user2, diff2) => {
    // Find the index of the user object in the users array
    const idx1 = users.findIndex((user) => user.id === user1);
    const idx2 = users.findIndex((user) => user.id === user2);

    if (idx1 !== -1 && idx2 !== -1) {
      // Create a new user object with the updated score
      const new1 = {
        ...users[idx1],
        current_rating: users[idx1].current_rating + diff1,
      };
      const new2 = {
        ...users[idx2],
        current_rating: users[idx2].current_rating + diff2,
      }

      // Replace the old user object with the new user object in the users array
      const updatedUsers = [...users];
      updatedUsers[idx1] = new1;
      updatedUsers[idx2] = new2;

      // Update the users array in the context
      setUsers(updatedUsers);
    }
  };

  const getTimestamp = () => {
    const currentDate = new Date();
    const dateStr = currentDate.getDate() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getFullYear();
    return dateStr;
  }

  const createRatingsHistoryEntry = (userId) => {
    const user = users.find(u => u.id === userId);
    if (!user) {
      console.log("Something went wrong. Unable to create ratings history entry")
      return
    }

    const newEntry = {
      "player_id": userId,
      "timestamp": getTimestamp(),
      "rating": user.current_rating,
    }

    setRatingHistory(prev => [...prev, newEntry])
  }

  const handleSubmit = () => {

    setShowAlert(false)

    const p1 = users.find(u => u.id === player1Id)
    const p2 = users.find(u => u.id === player2Id)

    if (!p1 || !p2) {
      console.log('Error finding users')
      return
    }

    const p1Exp = 1.0 / (1 + Math.exp((p2.current_rating - p1.current_rating) / 400.0))
    const p2Exp = 1.0 / (1 + Math.exp((p1.current_rating - p2.current_rating) / 400.0))

    const s1 = winner === 'player1' ? 1.0 : 0.0;
    const s2 = winner === 'player2' ? 1.0 : 0.0;
    
    const k = 32; // maximum possible score
    const diff1 = Math.round(k * (s1 - p1Exp));
    const diff2 = Math.round(k * (s2 - p2Exp));

    console.log('Player 1 score adjustment: ' + diff1);
    console.log('Player 2 score adjustment: ' + diff2);


    // 1. create match entry
    const newMatch = {
      "id": findFreeId(matches),
      "player1_id": player1Id,
      "player2_id": player2Id,
      "winner_id": winner === 'player1' ? player1Id : player2Id,
      "timestamp": getTimestamp(),
      "score_change": Math.abs(diff1)
    }
    setMatches(prev => [...prev, newMatch]);


    // 2. update score of each user
    updateUserScore(player1Id, diff1, player2Id, diff2); 

    // 3. create score update entry for each user
    createRatingsHistoryEntry(player1Id);
    createRatingsHistoryEntry(player2Id);

     // 4. display updated scores in alert
    setAlertMsg(`${p1.name} ${diff1} (${p1.current_rating + diff1}) \n${p2.name} ${diff2} (${p2.current_rating + diff2})`)
    setShowAlert(true)

    setPlayer1Id("")
    setPlayer2Id("")
  }

  return (
    <>
      <Typography variant='h6'>Add Result</Typography>
      <FormControl fullWidth>
        <InputLabel id="player-1-label">Player 1</InputLabel>
        <Select
          labelId="player-1-label"
          id="player-1-select"
          value={player1Id}
          label="Player1"
          onChange={handlePlayer1Selection}
        >
          { 
            player1Options.map((player) => (<MenuItem key={player.id} value={player.id}>{player.label}</MenuItem> ))
          }
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="player-2-label">Player 2</InputLabel>
        <Select 
          labelId="player-2-label"
          id="player-2-select"
          value={player2Id}
          label="Player2"
          onChange={handlePlayer2Selection}
          >
          {
            player2Options.map((player) => (<MenuItem key={player.id} value={player.id}>{player.label}</MenuItem>))
          }
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel id="winner-radio-label">Winner</FormLabel>
        <RadioGroup
          aria-labelledby="winner-radio-label"
          name="winner-radio-group"
          value={winner}
          onChange={handleWinnerSelect}
        >
          <FormControlLabel key={1} value="player1" control={<Radio />} label="Player 1" />
          <FormControlLabel key={2} value="player2" control={<Radio />} label="Player 2" />
        </RadioGroup>
      </FormControl>

      <Button variant='outlined' onClick={handleSubmit}>Submit</Button>

      <Collapse in={showAlert}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setShowAlert(false);
              }}
            >
              <Close fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {alertMsg}
        </Alert>
      </Collapse>

    </>
  )
}

export default NewResultForm;
