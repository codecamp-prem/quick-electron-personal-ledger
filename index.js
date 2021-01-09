//const { app, BrowserWindow } = require("electron");
const { app, BrowserWindow, ipcMain } = require('electron');
const url = require('url');
const mysql = require('mysql');
const pool_connection = mysql.createPool({
  connectionLimit : 10,
  host     : 'localhost',
  user     : 'YOUR_DB_LOGIN_NAME',
  password : 'YOUR_DB_PASSWORD',
  database : 'destination'
});

function ledgerApp() {
  
  window = new BrowserWindow({
    /*
    Node.js integration as true when the browser window (where this HTML file is embedded) was originally created in the main process. Short: require error motherfather solved.
    */
    webPreferences: {
      nodeIntegration: true
    },
  });
  window.maximize();
  window.loadURL(
    url.format({
      pathname: "index.html",
      slashes: true
    })
  );
  window.once('ready-to-show', function (){
    window.show();
  });
  //window.webContents.openDevTools();

  let contents = window.webContents;

  window.on('closed', function() {
    window = null;
  });
}

// Go to daily sale
ipcMain.on('goto_daily_sale', function (event, loginData) {
  window.loadURL(
    url.format({
      pathname: "main.html",
      slashes: true
    })
  );
});

// Insert new daily sales record
ipcMain.on('add-sales-record', function (event, data) {
  pool_connection.getConnection(function(err, connection) {
    // not connected!
    if (err){
      window.webContents.send('action-error-update-row', 'Mysql Connection WENT sHREK');
    }
    
    var sql_insert = 'INSERT INTO `daily_sales`(`sales_description`, `sales_credit`, `sales_profit`, `sales_debited`) VALUES ("'+ data.sales_description +'",'+ data.sales_credit +','+ data.sales_profit +',"'+ data.sales_debited +'")';
    
    // Use the connection
    connection.query(sql_insert, function (error, results, fields) {
      if (error){
        window.webContents.send('action-error-insert-row', 'dEV WENT sHREK');
      } 
      else {
        if(Object.keys(results)['affectedRows'] < 1){
          window.webContents.send('action-error-insert-row', 'uSer ID10t WENT sHREK');
        }else{
          window.webContents.send('action-success-insert', results);
        }
      }
      // When done with the connection, release it.
      connection.release();
      // Handle error after the release.
      if (error){
        window.webContents.send('action-error-index', 'Mysql Connection REALEASE WENT sHREK');
      }
      // Don't use the connection here, it has been returned to the pool.
    });
  });
});

// update edited row from daily sales
ipcMain.on('update-row-submission', function (event, data) {
  pool_connection.getConnection(function(err, connection) {
    // not connected!
    if (err){
      window.webContents.send('action-error-update-row', 'Mysql Connection WENT sHREK');
    }
    
    var sql_update = 'UPDATE `daily_sales` SET `sales_description`="'+ data.sales_description +'",`sales_credit`='+ data.sales_credit +',`sales_profit`='+ data.sales_profit +',`sales_debited`="'+ data.sales_debited +'" WHERE `sales_id`='+ data.sales_id +'';
    
    // Use the connection
    connection.query(sql_update, function (error, results, fields) {
      if (error){
        window.webContents.send('action-error-update-row', 'dEV WENT sHREK');
      } 
      else {
        if(Object.keys(results)['affectedRows'] < 1){
          window.webContents.send('action-error-update-row', 'uSer ID10t WENT sHREK');
        }else{
          window.webContents.send('action-success-update', results);
        }
      }
      // When done with the connection, release it.
      connection.release();
      // Handle error after the release.
      if (error){
        window.webContents.send('action-error-index', 'Mysql Connection REALEASE WENT sHREK');
      }
      // Don't use the connection here, it has been returned to the pool.
    });
  });
});

// Delete single row from daily sales
ipcMain.on('delete-row-submission', function (event, data) {
  pool_connection.getConnection(function(err, connection) {
    // not connected!
    if (err){
      window.webContents.send('action-error-delete-row', 'Mysql Connection WENT sHREK');
    }
    
    var sql_update = 'DELETE FROM `daily_sales` WHERE `sales_id`='+ data.rowId +'';
    
    // Use the connection
    connection.query(sql_update, function (error, results, fields) {
      if (error){
        window.webContents.send('action-error-delete-row', 'dEV WENT sHREK');
      } 
      else {
        if(Object.keys(results)['affectedRows'] < 1){
          window.webContents.send('action-error-delete-row', 'uSer ID10t WENT sHREK');
        }else{
          window.webContents.send('action-success-delete', results);
        }
      }
      // When done with the connection, release it.
      connection.release();
      // Handle error after the release.
      if (error){
        window.webContents.send('action-error-index', 'Mysql Connection REALEASE WENT sHREK');
      }
      // Don't use the connection here, it has been returned to the pool.
    });
  });
});

// list the daily sales record on main.html
ipcMain.on('get_daily_sales', function (event, data) {
  pool_connection.getConnection(function(err, connection) {
    // not connected!
    if (err){
      window.webContents.send('action-error-list-main', 'Mysql Connection WENT sHREK');
    }

    var sql = 'SELECT * FROM `daily_sales` ORDER BY `sales_id` DESC';

    // Use the connection
    connection.query(sql, function (error, results, fields) {
      if (error){
        window.webContents.send('action-error-list-main', 'dEV WENT sHREK');
      } 
      else {
        if(Object.keys(results).length < 1){
          window.webContents.send('action-error-list-main', 'uSer ID10t WENT sHREK');
        }else{
          window.webContents.send('action-success-list-main', results);
        }
      }
      // When done with the connection, release it.
      connection.release();
      // Handle error after the release.
      if (error){
        window.webContents.send('action-error-index', 'Mysql Connection REALEASE WENT sHREK');
      }
      // Don't use the connection here, it has been returned to the pool.
    });
  });
});

// Login Verification OK -Go to main.html
ipcMain.on('form-submission', function (event, loginData) {
  var md5 = require('md5');
  pool_connection.getConnection(function(err, connection) {
    // not connected!
    if (err){
      window.webContents.send('action-error-index', 'Mysql Connection WENT sHREK');
    }

    var sql = 'SELECT * FROM `admin_user` WHERE `admin_email`="'+ loginData.email.trim() + '" and `password`="'+ md5(loginData.pswd.trim()) +'"';

    // Use the connection
    connection.query(sql, function (error, results, fields) {
      if (error){
        window.webContents.send('action-error-index', 'dEV WENT sHREK');
      } 
      else {
        if(Object.keys(results).length < 1){
          window.webContents.send('action-error-index', 'uSer ID10t WENT sHREK');
        }else{
          window.loadURL(
            url.format({
              pathname: "main.html",
              slashes: true
            })
          ); 
        }
        //$('#resultDiv').text(results[0].emp_name); //emp_name is column name in your database
      }
      // When done with the connection, release it.
      connection.release();
      // Handle error after the release.
      if (error){
        window.webContents.send('action-error-index', 'Mysql Connection REALEASE WENT sHREK');
      }
  
      // Don't use the connection here, it has been returned to the pool.
    });
  });
});

// Go to daily sale
ipcMain.on('goto_daily_expense', function (event, loginData) {
  window.loadURL(
    url.format({
      pathname: "expense.html",
      slashes: true
    })
  );
});

// List the Daily EXPENSE report on expense.html
ipcMain.on('get_daily_expense', function (event, loginData) {
  pool_connection.getConnection(function(err, connection) {
    // not connected!
    if (err){
      window.webContents.send('action-error-expense', 'Mysql Connection WENT sHREK');
    }
    var sql = 'SELECT * FROM `daily_expense` ORDER BY `expense_id` DESC';
    // Use the connection
    connection.query(sql, function (error, results, fields) {
      if (error){
        window.webContents.send('action-error-expense', 'dEV WENT sHREK');
      } 
      else {
        if(Object.keys(results).length < 1){
          window.webContents.send('action-error-expense', 'uSer ID10t WENT sHREK');
        }else{ 
          window.webContents.send('action-success-list-expense', results);
        }
        //$('#resultDiv').text(results[0].emp_name); //emp_name is column name in your database
      }
      // When done with the connection, release it.
      connection.release();
      // Handle error after the release.
      if (error){
        window.webContents.send('action-error-index', 'Mysql Connection REALEASE WENT sHREK');
      }
      // Don't use the connection here, it has been returned to the pool.
    });
  });
});

// update edited row from daily Expense
ipcMain.on('update-row-submission-expense', function (event, data) {
  pool_connection.getConnection(function(err, connection) {
    // not connected!
    if (err){
      window.webContents.send('action-error-update-row', 'Mysql Connection WENT sHREK');
    }
    
    var sql_update = 'UPDATE `daily_expense` SET `expense_description`="'+ data.expense_description +'",`expense_credit`='+ data.expense_credit +',`expense_receiver`="'+ data.expense_receiver +'",`expense_account`="'+ data.expense_account +'" WHERE `expense_id`='+ data.expense_id +'';
    
    // Use the connection
    connection.query(sql_update, function (error, results, fields) {
      if (error){
        window.webContents.send('action-error-update-row', 'dEV WENT sHREK');
      } 
      else {
        if(Object.keys(results)['affectedRows'] < 1){
          window.webContents.send('action-error-update-row', 'uSer ID10t WENT sHREK');
        }else{
          window.webContents.send('action-success-update', results);
        }
      }
      // When done with the connection, release it.
      connection.release();
      // Handle error after the release.
      if (error){
        window.webContents.send('action-error-index', 'Mysql Connection REALEASE WENT sHREK');
      }
      // Don't use the connection here, it has been returned to the pool.
    });
  });
});

// Delete single row from daily Expense
ipcMain.on('delete-row-submission-expense', function (event, data) {
  pool_connection.getConnection(function(err, connection) {
    // not connected!
    if (err){
      window.webContents.send('action-error-delete-row', 'Mysql Connection WENT sHREK');
    }
    
    var sql_update = 'DELETE FROM `daily_expense` WHERE `expense_id`='+ data.rowId +'';
    
    // Use the connection
    connection.query(sql_update, function (error, results, fields) {
      if (error){
        window.webContents.send('action-error-delete-row', 'dEV WENT sHREK');
      } 
      else {
        if(Object.keys(results)['affectedRows'] < 1){
          window.webContents.send('action-error-delete-row', 'uSer ID10t WENT sHREK');
        }else{
          window.webContents.send('action-success-delete', results);
        }
      }
      // When done with the connection, release it.
      connection.release();
      // Handle error after the release.
      if (error){
        window.webContents.send('action-error-index', 'Mysql Connection REALEASE WENT sHREK');
      }
      // Don't use the connection here, it has been returned to the pool.
    });
  });
});

// Insert new daily EXPENSE record
ipcMain.on('add-expense-record', function (event, data) {
  pool_connection.getConnection(function(err, connection) {
    // not connected!
    if (err){
      window.webContents.send('action-error-update-row', 'Mysql Connection WENT sHREK');
    }
    
    var sql_insert = 'INSERT INTO `daily_expense`(`expense_description`, `expense_credit`, `expense_receiver`, `expense_account`) VALUES ("'+ data.expense_description +'",'+ data.expense_credit +',"'+ data.expense_receiver +'","'+ data.expense_account +'")';
    
    // Use the connection
    connection.query(sql_insert, function (error, results, fields) {
      if (error){
        window.webContents.send('action-error-insert-row', 'dEV WENT sHREK');
      } 
      else {
        if(Object.keys(results)['affectedRows'] < 1){
          window.webContents.send('action-error-insert-row', 'uSer ID10t WENT sHREK');
        }else{
          window.webContents.send('action-success-insert', results);
        }
      }
      // When done with the connection, release it.
      connection.release();
      // Handle error after the release.
      if (error){
        window.webContents.send('action-error-index', 'Mysql Connection REALEASE WENT sHREK');
      }
      // Don't use the connection here, it has been returned to the pool.
    });
  });
});

app.on("ready", ledgerApp);
// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
      app.quit()
  }
});
