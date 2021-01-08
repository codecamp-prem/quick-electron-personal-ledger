const ipcRenderer = require('electron').ipcRenderer;

function sendLoginForm(event) {
    event.preventDefault() ; // stop the form from submitting
    let inputEmail = document.getElementById("inputEmail").value;
    let inputPassword = document.getElementById("inputPassword").value;
    ipcRenderer.send('form-submission', {email:inputEmail,pswd:inputPassword})
}

function sendAddSalesForm(e){
    e.preventDefault(); // stop the form from submitting
    let description = $("#formDailySales").find('input[name="add_description"]').val();
    let credit =$("#formDailySales").find('input[name="add_credit"]').val();
    let profit =$("#formDailySales").find('input[name="add_profit"]').val();
    let debited = $("#formDailySales").find('select[name="add_debited"]').val();
    let addThisData = {sales_description:description,sales_credit:credit,sales_profit:profit,sales_debited:debited};
    ipcRenderer.send('add-sales-record', addThisData);
}

function goToSales(event){
    ipcRenderer.send('goto_daily_sale', {sess_key:'destination'});
}

function get_daily_sales(event) {
    ipcRenderer.send('get_daily_sales', {sess_key:'destination'});
    console.log('get_daily_sales called');
}

function update_sales_list_row(data) {
    ipcRenderer.send('update-row-submission', data);
}

function delete_sales_list_row(data) {
    ipcRenderer.send('delete-row-submission', data);
}

function goToExpense(event){
    ipcRenderer.send('goto_daily_expense', {sess_key:'destination'});
}

function get_daily_expense(event) {
    ipcRenderer.send('get_daily_expense', {sess_key:'destination'});
}

function update_expense_list_row(data) {
    ipcRenderer.send('update-row-submission-expense', data);
}

function delete_expense_list_row(data) {
    ipcRenderer.send('delete-row-submission-expense', data);
}

function sendAddExpenseForm(e){
    e.preventDefault(); // stop the form from submitting
    let description = $("#formDailyExpense").find('input[name="add_description"]').val();
    let credit =$("#formDailyExpense").find('input[name="add_credit"]').val();
    let reciever =$("#formDailyExpense").find('input[name="add_receiver"]').val();
    let account = $("#formDailyExpense").find('select[name="add_account"]').val();
    let addThisData = {expense_description:description,expense_credit:credit,expense_receiver:reciever,expense_account:account};
    ipcRenderer.send('add-expense-record', addThisData);
}