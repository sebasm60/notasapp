const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
require('dotenv').config();

app.set('port', process.env.PORT);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use('/api/auth/', require('./routes/auth'));
app.use('/api/estudiantes', require('./routes/students'));
app.use('/api/acudientes', require('./routes/acudientes'));
app.use('/api/profesores', require('./routes/profesores'));
app.use('/api/asignaturas', require('./routes/asignaturas'));
app.use('/api/grados', require('./routes/grados'));
app.use('/api/grupos', require('./routes/grupos'));
app.use('/api/grupoGrado', require('./routes/grupoGrado'));
app.use('/api/estudianteAcudiente', require('./routes/estudiante-acudiente'));
app.use('/api/estudianteAsistencia', require('./routes/estudiante-asistencia'));
app.use('/api/estudianteCalificaciones', require('./routes/estudiante-calificaciones'));
app.use('/api/profesorAsignatura', require('./routes/profesor-asignatura'));
app.use('/api/profesorGrupo', require('./routes/profesor-grupo'));

app.listen(app.get('port'), () => {
    console.log(`Start on port ${app.get('port')}`);
});