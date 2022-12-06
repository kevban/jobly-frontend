import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';


const SearchBar = ({filter}) => {
    const [searchTerm, setSearchTerm] = useState('')
    const search = (evt) => {
        setSearchTerm(evt.target.value)
        filter(evt.target.value)
    }
    return <div>
        <TextField
            fullWidth
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
            value={searchTerm}
            onChange={search}
            ></TextField>
    </div>
}

export default SearchBar