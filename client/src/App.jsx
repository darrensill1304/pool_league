import React from 'react'

import NewUserForm from './components/NewUserForm'
import TableComponent from './components/TableComponent'
import UserDetail from './components/user_detail/UserDetail'

import { DataProvider } from './context/DataContext'

import './App.css'
import { Divider, Stack } from '@mui/material'
import NewResultForm from './components/NewResultForm'

function App() {

  return (
    <DataProvider>
      <Stack sx={{height: '100%'}} direction={'row'} divider={<Divider orientation='vertical' flexItem />} spacing={2}>

        <TableComponent />
       
        <Stack sx={{minWidth: '600px'}} direction={'column'} divider={<Divider orientation='horizontal' flexItem />} spacing={2} >
          <NewUserForm />
          <NewResultForm />
          <UserDetail />
        </Stack>

      </Stack>
    </DataProvider>
  )
}

export default App
