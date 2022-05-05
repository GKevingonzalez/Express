const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
const customers = require('./Routes/customers');

app.use('/customers', customers);
app.use(require('./Routes/controllers'));

app.listen(3000, () => {
     console.log('Servidor funcionando')
});
