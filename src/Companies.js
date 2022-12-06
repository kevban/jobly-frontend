import { Container, Stack } from "@mui/system";
import React, { useState, useEffect } from "react";
import JoblyApi from "./api";
import CompanyCard from "./CompanyCard";
import SearchBar from "./SearchBar";
import filter from './helpers/filter'

const Companies = () => {
    const [companyList, setCompanyList] = useState([]);
    const [filteredCompanies, setFilteredCompanies] = useState([]);
    useEffect(() => {
        JoblyApi.getCompanies()
            .then(data => {
                setCompanyList(() => data)
                setFilteredCompanies(() => data)
            })
    }, [])
    return <Container>
        <h1>Companies</h1>
        <SearchBar filter={(term) => filter(term, 'name', companyList, setFilteredCompanies)}></SearchBar>
        <Stack spacing={2}>
            {filteredCompanies.map((val) => {
                return <CompanyCard val={val} key={val.handle}></CompanyCard>
            })}
        </Stack>
    </Container>
}

export default Companies