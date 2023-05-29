import React, { useContext } from 'react';
import { DataContext } from '../../context/DataContext';
import { Stack, Typography } from '@mui/material';
import { EmojiEvents } from '@mui/icons-material';


function GameResult({game}) {

  const {users} = useContext(DataContext);

  const getP1Name = () => {
    const p1 = users.find(u => u.id === game.player1_id);
    return p1 ? p1.name : "Unknown";
  }

  const getP2Name = () => {
    const p2 = users.find(u => u.id === game.player2_id);
    return p2 ? p2.name : "Unknown";
  }

  return (
    <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} gap={1}>
      { game.winner_id === game.player1_id ? <EmojiEvents sx={{color:'gold'}}/> : null }
      <Typography>{ getP1Name() } vs { getP2Name() }</Typography>                
      { game.winner_id === game.player2_id ? <EmojiEvents sx={{color:'gold'}}/> : null }
    </Stack> 
  );
}

export default GameResult;
