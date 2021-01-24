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

//Checks expense type
const checkExpenseType = (type, amount) => {
    if (type == 2) {
        amount = parseFloat(amount);
        return amount;
    } else if (type == 1) {
        amount = parseFloat(-amount);
        return amount;
    }
}

//Calculate income total
const incomeTotal = () => {
    const incomeNumber = document.querySelector('#income-number');
    const recordsArray = getSavedRecords();
    let count = 0;

    recordsArray.forEach(record => {
        if(record.type == 2) {
            count += record.amount;
        }
    });
    count = count.toFixed(2);
    incomeNumber.textContent = count;
}

//Calculate expense total
const expenseTotal = () => {
    const expensesNumber = document.querySelector('#expenses-number');
    const recordsArray = getSavedRecords();
    let count = 0;

    recordsArray.forEach(record => {
        if(record.type == 1) {
            count += record.amount;
        }
    });
    count = count.toFixed(2);
    expensesNumber.textContent = count;
}