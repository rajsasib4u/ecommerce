const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'proddb'
});

con.connect(function (error) {

    if (error) {
        console.log(error);
    }
    else {

        console.log('database connected');
    }

})

module.exports = con;