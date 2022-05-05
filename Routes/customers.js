const express = require('express')
const router = express.Router();
const {verifyEmail, verifyFields, addUsuario, limit} = require('../models/customers');

const querys = require('../controllers/querys');

router.get('/', (req, res) => { 
    
    // querys.getSelect(req, res);
       return res.json({text: 'HOLA'})
});

router.get('/limit', async (req, res) => {
    try{
        const persona = req.query;
        const limitImpuesto = await limit(persona);
        if(limitImpuesto){
            return res.status(203).json(limitImpuesto)
        }
    } catch (e){
        console.log(e)
        return res.status(500).json(e);
    }
    return res.json({});
});

router.post('/', async (req, res) => {
    try {
        const persona = req.body;
        const customerExist = await verifyEmail(persona); // .catch((e) => { return res.status(500).json(e) });
        if (customerExist) {
            return res.status(203).json({success: false, msg: 'El correo del usuario ya existe'});
        } 

        const fieldsFail = verifyFields(persona);
        if (!fieldsFail.success){
            return res.status(203).json(fieldsFail);
        }
        else{
            const addUser = addUsuario(persona);
            return res.status(203).json({success: true, msg: 'se ha creado el cliente'})   
        }
    } catch (e){
        console.log(e)
        return res.status(500).json(e);
    }
    return res.json({});
});


module.exports = router;