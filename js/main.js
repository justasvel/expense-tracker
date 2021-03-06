//Gets records of expenses
const records = getSavedRecords();

window.addEventListener('load', (e) => {
    if (records !== []) {
        incomeTotal();
        expenseTotal();
        balance();
    }
    // displayHistory(records);
    recordsList(records);
});

document.querySelector('#form').addEventListener('submit', (e) => {
    e.preventDefault();
    const type = document.querySelector('#type').value;
    const date = document.querySelector('#date').value;
    const description = document.querySelector('#description').value.trim();
    let amount = document.querySelector('#amount').value;
    //Check expense type
    amount = checkExpenseType(type, amount);


    records.push({
        type: type,
        id: uuidv4(),
        date: date,
        description: description,
        amount: amount
    });
    clearInputs();
    saveRecords();
    incomeTotal();
    expenseTotal();
    balance();
    recordsList(records);
    displayHistory(records);
});

//Delete all history
document.querySelector('#history-btn').addEventListener('click', (e) => {
    clearStorage();
    window.location.reload();
    displayHistory(records);
})