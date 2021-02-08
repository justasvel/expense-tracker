//Gets all records from localStorage
const getSavedRecords = () => {
    const recordsJSON = localStorage.getItem('records');

    try {
        return recordsJSON ? JSON.parse(recordsJSON) : [];
    } catch (e) {
        return [];
    }
}

//Display History Div
const displayHistory = (records) => {
    let div = document.querySelector('#history-btn');
    if (records != []) {
        div.classList.remove('d-none');
    } else if (records == []) {
        div.classList.add('.d-none');
    }
}

//Saves records to localStorage
const saveRecords = () => {
    localStorage.setItem('records', JSON.stringify(records));
}

// Clear local storage
const clearStorage = () => {
    localStorage.removeItem('records');
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
        if (record.type == 2) {
            count += record.amount;
        }
    });
    count = count.toFixed(2);
    incomeNumber.textContent = count;

    return count;
}

//Calculate expense total
const expenseTotal = () => {
    const expensesNumber = document.querySelector('#expenses-number');
    const recordsArray = getSavedRecords();
    let count = 0;

    recordsArray.forEach(record => {
        if (record.type == 1) {
            count += record.amount;
        }
    });
    count = count.toFixed(2);
    expensesNumber.textContent = count;

    return count;
}

//Calculate balance 
const balance = () => {
    const balanceNumber = document.querySelector('#balance-number');
    const balanceContainer = document.querySelector('#balance');

    let balanceAmount = (parseInt(incomeTotal() * 100) / 100) + (parseInt(expenseTotal() * 100) / 100);
    balanceNumber.textContent = balanceAmount.toFixed(2);

    if (balanceAmount < 0) {
        balanceContainer.style.color = 'red';
    } else if (balanceAmount > 0) {
        balanceContainer.style.color = 'green';
    }

    return balanceNumber;
}

//Remove record
const removeRecord = (id) => {
    const recordIndex = records.findIndex((record) => id === record.id);

    if (recordIndex > -1) {
        records.splice(recordIndex, 1);
        saveRecords();
        recordsList(records);
    }
}

//Generate records list
const recordsList = (records) => {
    //Select history log
    let historyLog = document.querySelector('#history-list');

    //Removes all previous records to avoid duplicates
    historyLog.innerHTML = '';

    //Print out records
    if (records.length > 0) {
        records.forEach((record) => {

            const recordRow = document.createElement('div');
            const recordLog = document.createElement('div');
            const recordDate = document.createElement('div');
            const recordDescription = document.createElement('div');
            const recordDollerSign = document.createElement('div');

            //Classes for records
            recordRow.classList.add('row');
            recordLog.classList.add('log', 'd-flex', 'justify-content-around', 'py-2', 'col');
            recordDate.classList.add('log-data');
            recordDescription.classList.add('log-data');
            recordDollerSign.classList.add('log-data');

            //Generate log layout
            historyLog.appendChild(recordRow);
            recordRow.appendChild(recordLog);
            recordLog.appendChild(recordDate);
            recordLog.appendChild(recordDescription);
            recordLog.appendChild(recordDollerSign);

            recordDate.textContent = record.date;
            recordDescription.textContent = record.description;
            recordDollerSign.innerHTML = ` <span>$ ${record.amount}<span>`;

            //Generate x button
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = 'x';
            deleteButton.classList.add('x-button');
            recordLog.appendChild(deleteButton);

            deleteButton.addEventListener('click', () => {
                let id = record.id;
                removeRecord(id);
                incomeTotal();
                expenseTotal();
                balance();
            })
        });
    }
}

//Clear form inputs
const clearInputs = () => {
    document.querySelector('#form').reset();
}