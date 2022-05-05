const express = require('express');
const connection = require('../mysql');

function getSelect(req, res){
    connection.query('SELECT * FROM clientes', 
    (error, results, fields) => {
        
        if(!error){
            console.log('get funcionando') 
            res.json(results);
        }
        else{
            console.error(error);
            
        } 
    });  
      
};

function emailSelect(req, res){
    Persona = req.body
    console.log(Persona);
    connection.query(`SELECT email FROM clientes`, (error, results, fields) => {
    
        if(!error){
            var isSame = results.some((e) => {
                return e.email == Persona.email
            });

            if(isSame)
                console.log('se repite');
        
            else{
                console.log('no se repite el email por lo tanto se agregará')
                addCliente();
                validarCampos();
            }
        }     
        else
            console.error(error);
           
    });
        
};    

function addCliente(req, res){
    connection.query(`INSERT into clientes(nombre, apellido, edad, telefono, email, contraseña) 
        VALUES("${Persona.name}", "${Persona.apellido}", "${Persona.edad}", 
        "${Persona.telefono}", "${Persona.email}", "${Persona.contraseña}")`,
        (error, results, fields) => {

            if(!error){
                console.log('post funcionando')
               // res.json(results)
            }
            else{
                console.error(error);
            }

    });            
} 

function validarCampos(req, res){

    if(Persona.name == "NULL" || Persona.name == ""){
        console.log('no se ha ingresado el nombre, por favor verifique')
        //return res.json(results);
       //  return {success: false, msg: ''}
    
    }
    else if(Persona.apellido == "NULL" || Persona.apellido == ""){
        console.log('no se ha ingresado el apellido, por favor verifique')
        //return res.json(results);
    }
    else if(Persona.edad == 'NULL' || Persona.edad == "" ){
        console.log('no se ha ingresado la edad, por favor verifique')
       // return res.json(results);
    }
    else if(Persona.telefono == 'NULL' || Persona.telefono == "" ){
        console.log('no se ha ingresado el telefono, por favor verifique')
       // return res.json(results);
    }
    else if(Persona.email == "NULL" || Persona.email == ""){
        console.log('no se ha ingresado el correo, por favor verificar')
        //return res.json(results);
    }
    else if(Persona.contraseña == "NULL" || Persona.contraseña == ""){
        console.log('no se ha ingresado la contraseña, por favor verficar')
       // return res.json(results);
    }
    else{
        console.log('todos los campos se encontraron');
        //res.json(results);
    }
}

exports.emailSelect = emailSelect;
exports.getSelect = getSelect;
exports.addCliente = addCliente;
exports.validarCampos = validarCampos;
