import React from "react";
import { Card, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const CompanyCard = ({ val }) => (
    <Card sx={{ p: 2 }}>
        <Grid container>
            <Grid item xs={10}>
                <Typography
                    variant="h4"
                    noWrap
                    component={Link}
                    to={`/companies/${val.handle}`}
                    sx={{
                        textDecoration: 'none',
                        color: 'inherit'
                    }}
                >{val.name}</Typography>
            </Grid>
            <Grid item xs={2}>
                <img alt="company" height={80} width={100} src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/business-logo-design-template-78655edda18bc1196ab28760f1535baa_screen.jpg?ts=1617645324g"></img>
            </Grid>
        </Grid>
        <p>{val.description}</p>
    </Card>
)

export default CompanyCard