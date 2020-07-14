require('./config/config');
const express = require('express');
const db = require('./baseData/index');
const app = express();
app.use(require('./routes/routes'));
const path = require('path');

db.connect()
    .then(() => {
        app.use(express.static(path.resolve(__dirname,'../public')));
        app.listen(3000,() =>{
            console.log('escuchando el puerto: ',process.env.PORT);
        });
                
    });