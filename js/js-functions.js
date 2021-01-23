//Gets all records from localStorage
const getSavedRecords = () => {
    const recordsJSON = localStorage.getItem('records');

    try {
        return recordsJSON ? JSON.parse(recordsJSON) : [];
    } catch (e) {
        return [];
    }
}

//Saves records to localStorage

const saveRecords = () => {
    localStorage.setItem('records', JSON.stringify(records));
}