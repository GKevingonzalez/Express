const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    database : 'proyecto',
    user     : 'root',
    password : ''
  });

  connection.connect(function(error){
    if(error){
        console.log(error);
        return;
    }else{
        console.log('CONEXION EXITOSA');
    }
});

module.exports = connection;  