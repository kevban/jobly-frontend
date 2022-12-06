import { Container } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./api";
import JobsList from "./JobsList";

const CompanyDetails = () => {
    const [company, setCompany] = useState({});
    const { handle } = useParams();
    useEffect(() => {
        JoblyApi.getCompany(handle)
            .then(res => {
                setCompany(res)
            })
    }, [handle])
    return (
        <Container>
            <h1>{company.name}</h1>
            <h3>{company.description}</h3>
            <JobsList jobs={company.jobs}></JobsList>
        </Container>
    )
}

export default CompanyDetails