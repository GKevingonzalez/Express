const express = require('express')
const router = express.Router();

const connection = require('../mysql');
const querys = require('../controllers/querys');

router.get('/login', (req, res) => { 
    
    querys.getSelect(req, res);
       
});

router.get('/login/limit', (req, res) => {
    console.log(req.query.init);
    connection.query(`SELECT * FROM clientes LIMIT ${req.query.init}, ${req.query.quantity}` , (error, 
        rows, fields) => {
            
            if(!error){
                
                res.json(rows);
            }
            else{
                console.error(error)
            } 
        });
});   

router.post('/login', (req, res) => {
    
    querys.emailSelect(req, res); 
         
});
    

  router.delete('/delete', (req, res) => {
    
    connection.query('DELETE FROM clientes WHERE id_cliente = 5', 
    (error, results, fields) => {
        if(!error){
            console.log('DELETE funcionando');
            res.json(results);
        }
        else{
            console.error(error);
        }
    });
  });

   router.put('/login', (req,res) => {
     Persona = req.body
     connection.query(`UPDATE clientes SET nombre = "${Persona.name}", apellido = "${Persona.apellido}",
      edad = "${Persona.edad}", telefono = "${Persona.telefono}" WHERE id_cliente = 5 `,
     (error, results, fields) => {
        
        if(!error){
            console.log('put funcionando')
            res.json(results);

        }
        else{
             console.error(error);
        } 
    }); 
});  

module.exports = router;
