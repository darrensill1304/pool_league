import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';
import { Alert, Button, Collapse, IconButton, Stack, TextField, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import { findFreeId } from '../utilities/ObjectUtils';

function NewUserForm() {

  const {users, setUsers} = useContext(DataContext);

  const [newUserName, setNewUserName] = useState("");
  const [showErrMsg, setShowErrMsg] = useState(false);
  const [errorMsg, setErrMsg] = useState("");

  const handleSubmitNewUser = () => {

    // Check name is not empty
    if (newUserName === "") {
      setErrMsg("Username cannot be empty. Try again");
      setShowErrMsg(true);
      return;
    }

    // Check name already exists
    if (users.some(u => u.name === newUserName)) {
      setErrMsg("A user with that name already exists. Try again.");
      setShowErrMsg(true);
      setNewUserName("");
      return;
    }

    const newUser = {
      "id": findFreeId(users),
      "name": newUserName,
      "current_rating": 1000,
    };

    setUsers(prev => [...prev, newUser]);
    setNewUserName("")
  }
  
  return (
    <Stack direction={'column'} justifyContent={'center'} gap={1}>
      <Typography variant='h6'>Add New User</Typography>
      <TextField id='new_user_text_field' required label='Username' variant='outlined' value={newUserName} onChange={(evt) => {setNewUserName(evt.target.value)}} />
      <Button variant='outlined' onClick={handleSubmitNewUser}>Submit</Button>
      <Collapse in={showErrMsg}>
        <Alert
          severity='error'
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setShowErrMsg(false);
              }}
            >
              <Close fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {errorMsg}
        </Alert>
      </Collapse>
    </Stack>
  )
}

export default NewUserForm;
