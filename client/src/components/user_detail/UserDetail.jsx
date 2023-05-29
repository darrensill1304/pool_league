import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../context/DataContext';
import { Stack, Typography } from '@mui/material';
import { Person } from '@mui/icons-material';
import GameHistory from './GameHistory';

function UserDetail() {

  const {users, selectedUser} = useContext(DataContext);

  const [user, setUser] = useState(null);

  useEffect(() => {

    setUser(users.find( u => u.id === selectedUser ))

  }, [selectedUser])


  return (
    <>
      <Stack direction={'column'} alignItems={'center'} justifyContent={'center'} gap={1}>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} gap={1}>
          {
            user ?
            <>
              <Person />
              <Typography>{user.name} ( {user.current_rating} )</Typography>
            </>
            :
              ""
          }
        </Stack>

        { user ? <GameHistory /> : null }

      </Stack>

    </>
  );
}

export default UserDetail;
