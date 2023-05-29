import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { FormControl, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material";
import WLRecord from "./WLRecord";
import RecentResults from "./RecentResults";

function GameHistory() {

  const {users, selectedUser, matches } = useContext(DataContext);

  const [opponentOptions, setOpponentOptions] = useState([]);
  const [selectedOpponent, setSelectedOpponent] = useState('all');

  useEffect(() => {

    setOpponentOptions(users.filter(u => u.id != selectedUser));
    setSelectedOpponent('all');

  }, [selectedUser, matches, users])


  const handleOpponentSelection = (event) => {
    setSelectedOpponent(event.target.value)
  }


  return (
    <>
      <Stack sx={{width: '100%'}} direction={'column'} alignItems={'center'} justifyContent={'center'} gap={1} >
        <Typography>Vs</Typography>
        <FormControl sx={{minWidth: '200px'}}>
          <InputLabel id='opponent-select-label'>Opponent</InputLabel>
          <Select 
            labelId='opponent-select-label'
            id='opponent-select'
            value={selectedOpponent}
            label="Opponent"
            onChange={handleOpponentSelection}>
           <MenuItem key='all' value='all'>All</MenuItem>  
           { opponentOptions.map(o => (<MenuItem key={o.id} value={o.id}>{o.name}</MenuItem>))}
          </Select>
        </FormControl>
        <WLRecord opponent={selectedOpponent} />
        <RecentResults opponent={selectedOpponent} />
      </Stack>
    </>
  )

}

export default GameHistory;
