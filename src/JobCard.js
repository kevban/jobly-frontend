import { Card, Typography, Grid, Button } from '@mui/material'
import React from 'react'

const JobCard = ({ val, applied, apply }) => {
    return (
        <Card sx={{ p: 2 }}>
            <Typography
                    variant="h4"
                    noWrap
                    sx={{
                        textDecoration: 'none',
                        color: 'inherit'
                    }}
                >{val.title}</Typography>
            <h4>{val.companyName}</h4>
            <p>Salary: {val.salary}</p>
            <p>Equity: {val.equity}</p>
            <Grid container display='flex' justifyContent='end'>
                {applied ? <Button variant='outlined'>Applied!</Button> :
                    <Button onClick={() => apply(val.id)} variant='outlined'>Apply</Button>}
            </Grid>
        </Card>
    )
}

export default JobCard