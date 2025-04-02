const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;


app.use(bodyParser.json());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',   
    password: 'password',   
    database: 'partyfinder'
});


db.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});


app.post('/reservas', (req, res) => {
    const { nombre, email, telefono, personas, fecha, hora, zona, comentarios } = req.body;


    const queryCheck = 'SELECT * FROM reservas WHERE fecha = ? AND hora = ?';
    db.query(queryCheck, [fecha, hora], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error al verificar la reserva' });
            return;
        }

        if (results.length > 0) {

            res.status(400).json({ error: 'Ya hay una reserva para esa fecha y hora' });
        } else {
  
            const queryInsert = 'INSERT INTO reservas (nombre, email, telefono, personas, fecha, hora, zona, comentarios) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            db.query(queryInsert, [nombre, email, telefono, personas, fecha, hora, zona, comentarios], (err, result) => {
                if (err) {
                    res.status(500).json({ error: 'Error al guardar la reserva' });
                    return;
                }
                res.status(200).json({ message: 'Reserva realizada correctamente' });
            });
        }
    });
});


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
