//Gets records of expenses
const records = getSavedRecords();

document.querySelector('#form').addEventListener('submit', (e) => {
    e.preventDefault();

    const type = document.querySelector('#type').value;
    console.log(type);
});