import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import JoblyApi from "./api";
import JobsList from "./JobsList";

const Jobs = () => {
    const [jobs, setJobs] = useState([])
    useEffect(() => {
        JoblyApi.getJobs()
            .then(data => {
                setJobs(() => data)
            })
    }, [])
    return (
        <Container>
            <h1>Jobs</h1>
            <JobsList jobs={jobs}></JobsList>
        </Container>)
}

export default Jobs