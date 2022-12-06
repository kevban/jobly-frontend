import React, { useContext } from 'react'
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import UserContext from './UserContext'

const Home = () => {
    const {user} = useContext(UserContext)
    return (
        <Stack spacing={2} display="flex" justifyContent="center" alignItems="center">
            <h1>Welcome to Job.ly</h1>
            <p>Convient place to find your next job!</p>
            {user.username ?  <h2>Welcome back {user.username}!</h2> : <Grid container spacing={2}>
                <Grid>
                    <Button variant="contained" LinkComponent={Link} to="/login">Log in</Button>
                </Grid>
                <Grid>
                    <Button variant="contained" LinkComponent={Link} to="/signup">Sign up</Button>
                </Grid>
            </Grid>}

        </Stack>
    )
}

export default Home