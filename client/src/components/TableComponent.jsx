import React, { useState, useEffect, useContext } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { DataContext } from '../context/DataContext';

function TableComponent() {

  const {users, selectedUser, setSelectedUser } = useContext(DataContext);
  const [sortedUsers, setSortedUsers] = useState([]);

  useEffect(() => {
    // Load the users data from the JSON file
    let tmpSortedUsers = users.sort((a,b) => { return b.current_rating - a.current_rating })
    setSortedUsers(tmpSortedUsers);
  }, [users]);

  const handleRowClick = (userId) => {
    setSelectedUser(userId);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }}>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Rank</TableCell>
              <TableCell>User</TableCell>
              <TableCell align='center'>Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedUsers.map((user, index) => (
              <TableRow
                key={user.id}
                sx={{ cursor: 'pointer' }}
                onClick={() => handleRowClick(user.id)}
                selected={user.id === selectedUser}
              >
                <TableCell component="th" scope="row" align='center'>{index+1}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell align='center'>{user.current_rating}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TableComponent;

