function filter(term, objName, fullList, setFilter) {
    setFilter(() => {
        if (!term || term === '') {
            return fullList
        } else {
            term = term.toLowerCase()
            return fullList.filter(val => val[objName].toLowerCase().includes(term))
        }
    })
}

export default filter;