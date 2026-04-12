const express = require ('express');   
const cors = require ('cors');
const knex = require('knex');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const staticPath = path.resolve(__dirname, 'images');
app.use('/uploads', express.static(staticPath));

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: 'carreras.db'
    },
    useNullAsDefault: true
});

//se importan las rutas y le pasamos app y la base de datos
require('./routes/carreras')(app, db);
require('./routes/atletas')(app, db);
require('./routes/inscripciones')(app, db);

app.listen(8080, () => {
    console.log("El backend ha iniciado en el puerto 8080"); 
});