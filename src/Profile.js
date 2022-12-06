import { Button, Grid } from "@mui/material";
import { Container, Stack } from "@mui/system";
import React, { useContext } from "react";
import JobsList from "./JobsList";
import UserContext from './UserContext'
import { Link, useNavigate } from "react-router-dom";
import JoblyApi from "./api";

const Profile = ({login}) => {
    const {user} = useContext(UserContext)
    const navigate = useNavigate()
    if (!user.username) {
        navigate('/signup')
    }
    const logout = () => {
        JoblyApi.logout()
        login('')
        navigate('/')
    }
    return (
        <Container>
            <Stack spacing={2}>
                <Grid container display={'flex'} justifyContent={'center'} alignItems='center'>
                    <Grid item xs={8}><h1>{user.username}</h1></Grid>
                    <Grid item xs={2}><Button style={{height: 50}} component={Link} to='/profile/edit' variant="contained">Edit Profile</Button></Grid>
                    <Grid item xs={2}><Button style={{height: 50}} onClick={logout} variant="contained" color='error'>Log out</Button></Grid>
                </Grid>
                <h2>{user.firstName} {user.lastName}</h2>
                <h5>{user.email}</h5>
                <h2>Applications:</h2>
                <JobsList jobs={user.jobs}></JobsList>
            </Stack>
        </Container>
    )
}

export default Profile