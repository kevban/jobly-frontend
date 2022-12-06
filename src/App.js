import './App.css';
import Home from './Home'
import AppBar from './JoblyAppBar';
import { Routes, Route } from 'react-router-dom'
import UserForm from './UserForm';
import { Stack } from '@mui/system';
import Companies from './Companies';
import CompanyDetails from './CompanyDetails';
import Jobs from './Jobs'
import React, { useEffect, useState } from 'react';
import JoblyApi from './api';
import jwt_decode from "jwt-decode"
import UserContext from './UserContext'
import Profile from './Profile';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [user, setUser] = useState({})
  const [userToken, setToken] = useLocalStorage('token')

  const updateUser= (data = {}) => {
    if (!userToken || userToken === '') {
      setUser({
        username: '',
        isAdmin: false
      })
    } else {
      if (!data.username) {
        JoblyApi.token = userToken;
        const userInfo = jwt_decode(userToken)
        JoblyApi.getUser(userInfo.username)
          .then(res => {
            setUser(res)
          })
      } else {
        setUser(data)
      }
    }
  }

  useEffect(() => {
    updateUser()
  }, [userToken])

  return (
    <UserContext.Provider value={{user: user, setUser: updateUser}}>
      <AppBar user={user}></AppBar>
      <Routes>
        <Route exact path='/' element={<Home></Home>}></Route>
        <Route exact path='/signup' element={<UserForm type={'signup'} login={setToken}></UserForm>}></Route>
        <Route exact path='/login' element={<UserForm type={'login'} login={setToken}></UserForm>}></Route>
        <Route exact path='/companies' element={<Companies></Companies>}></Route>
        <Route exact path='/companies/:handle' element={<CompanyDetails></CompanyDetails>}></Route>
        <Route exact path='/jobs' element={<Jobs></Jobs>}></Route>
        <Route exact path='/profile' element={<Profile login={setToken}></Profile>}></Route>
        <Route exact path='/profile/edit' element={<UserForm type={'patch'}></UserForm>}></Route>
        <Route path='*' element={
          <Stack display={'flex'} alignItems={'center'}>
            <h1>404</h1>
            <h2>Oops, nothing is here.</h2>
          </Stack>
        }></Route>
      </Routes>
    </UserContext.Provider>

  );
}

export default App;
