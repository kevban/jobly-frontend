import React, { useContext, useState, useEffect } from 'react'
import { Stack } from '@mui/material'
import JobCard from './JobCard'
import UserContext from './UserContext'
import JoblyApi from './api'
import { useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar'
import filter from './helpers/filter'

const JobsList = ({ jobs = [] }) => {
    const { user, setUser } = useContext(UserContext)
    const getAppliedJobs = () => {
        if (user.jobs) {
            return user.jobs.map(job => job.id)
        }
        return []
    }
    const [appliedJobs, setAppliedJobs] = useState(getAppliedJobs());
    const [filteredJobs, setFilteredJobs] = useState(() => {
        return jobs
    });
    useEffect(() => {
        setFilteredJobs(jobs)
    }, [jobs])
    const navigate = useNavigate();
    function apply(id) {
        if (user.username) {

            JoblyApi.applyJob(user.username, id)
                .then(res => {
                    setAppliedJobs((appliedJobs) => ([...appliedJobs, id]))
                    setUser()
                })
        } else {
            navigate('/signup')
        }
    }

    return <div>
        <SearchBar filter={(term) => filter(term, 'title', jobs, setFilteredJobs)}></SearchBar>
        <Stack spacing={2} sx={{ p: 2 }}>
            {filteredJobs.map((val) => {
                let applied = false
                if (appliedJobs.includes(val.id)) {
                    applied = true;
                }
                return <JobCard val={val} applied={applied} apply={apply} key={val.id}></JobCard>
            })}

        </Stack>
    </div>
}

export default JobsList