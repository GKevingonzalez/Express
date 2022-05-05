const { addCliente } = require("../controllers/querys");
const connection = require("../mysql");

const verifyEmail = (persona) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT email FROM clientes WHERE email = '${persona.email}'`;
        connection.query(sql,
        (err, result) => {
            if(!err) {
                resolve(result.length > 0);
            } else {
                reject(err);
            }
        });
    });
}

const addUsuario = (persona) => {
    return new Promise((resolver, reject) => {
        const sql = `INSERT into clientes(nombre, apellido, edad, telefono, email, contraseña) 
        VALUES("${persona.name}", "${persona.apellido}", "${persona.edad}", 
        "${persona.telefono}", "${persona.email}", "${persona.contraseña}")`;
        
        connection.query(sql,
        (error, results) => {
            if(!error){
                resolve(results.length > 0);
            } else{
                reject(error);
            } 
        });
    });    
}

function verifyFields(persona){

    if(persona.name == "" || persona.name == 'NULL'){
        return {success: false, msg: 'no se ha agregado el nombre, verifique'}
    }
    else if (persona.apellido == "NULL" || persona.apellido == "") {
        return {success: false, msg: 'no se ha agregado el apellido, verifique'}
    }
    else if (persona.edad == 'NULL' || persona.edad == "" ) {
        return {success: false, msg: 'no se ha agregado la edad, verifique'}
       
    }
    else if (persona.telefono == 'NULL' || persona.telefono == "" ) {
        return {success: false, msg: 'no se ha agregado el telefono, verifique'}
       
    }
    else if (persona.email == "NULL" || persona.email == "") {
        return {success: false, msg: 'no se ha agregado el email, verifique'}
       
    }
    else if (persona.contraseña == "NULL" || persona.contraseña == "") {
        return {success: false, msg: 'no se ha agregado la contraseña, verifique'}
       
    } else{
        return {success: true, msg: 'todos los campos se encontraron'}
    }

}

const limit = (persona) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM clientes ORDER BY edad ${persona.order} LIMIT ${persona.quantity} `
        connection.query(sql, (error, 
            rows) => {
                
                if(!error){
                    
                    resolve(rows);
        
                }
                else{
                    reject(error);
                } 
            });
    });
}

module.exports = {
    verifyEmail,
    verifyFields,
    addUsuario,
    limit
}