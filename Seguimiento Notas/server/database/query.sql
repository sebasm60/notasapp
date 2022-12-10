CREATE TABLE escuela.grado (
    id_grado serial PRIMARY KEY,
    grado VARCHAR(10) NOT NULL
);

CREATE TABLE escuela.grupo (
    id_grupo serial PRIMARY KEY,
    grupo VARCHAR(10) NOT NULL
);

CREATE TABLE escuela.gradoGrupo (
    id_grupo_grado serial PRIMARY KEY,
    id_grupo serial NOT NULL,
    id_grado serial NOT NULL,
    CONSTRAINT fk_grupo FOREIGN KEY (id_grupo) references escuela.grupo(id_grupo),
    CONSTRAINT fk_grado FOREIGN KEY (id_grado) references escuela.grado(id_grado)
);

CREATE TABLE escuela.personas (
    documento int PRIMARY KEY NOT NULL unique,
    nombres varchar(50) NOT NULL,
    apellidos varchar(50) NOT NULL,
    genero generos NOT NULL,
    estado varchar(50) NOT NULL,
    rol VARCHAR(50) NOT NULL
);

CREATE TABLE escuela.alumnos (
    documento int PRIMARY KEY NOT NULL unique,
    id_grupo_grado serial NOT NULL,
    edad int NOT NULL,
    CONSTRAINT fk_grupoGrado FOREIGN KEY (id_grupo_grado) references escuela.gradoGrupo(id_grupo_grado)
) inherits (escuela.personas);

CREATE TABLE escuela.profesores (
    documento int PRIMARY KEY NOT NULL unique
) inherits (escuela.personas);

CREATE TABLE escuela.acudientes (
    documento int PRIMARY KEY NOT NULL unique,
    telefono varchar(10) NOT NULL,
    correo varchar(50) NOT NULL,
    direccion varchar(50) NOT NULL
) inherits (escuela.personas);

CREATE TABLE escuela.cuentas (
    id_cuenta VArChAR(250) PRIMARY KEY NOT NULL,
    documento int NOT NULL UNIQUE,
    user VARCHAR(50) NOT NULL UNIQUE,
    pass VARCHAR(250) NOT NULL,
    rol VARCHAR(50) NOT NULL
);

CREATE TABLE escuela.asignatura (
    id serial PRIMARY KEY,
    nombre varchar(50) NOT NULL,
    estado boolean NOT NULL
);

CREATE TABLE escuela.estudiante_acudiente (
    id_acudiente_estudiante serial PRIMARY KEY,
    documento_estudiante int NOT NULL,
    documento_acudiente int NOT NULL,
    CONSTRAINT fk_estudiante FOREIGN KEY (documento_estudiante) references escuela.alumnos(documento),
    CONSTRAINT fk_acudiente FOREIGN KEY (documento_acudiente) references escuela.acudientes(documento)
);

CREATE TABLE escuela.estudiante_calificaciones (
    id_calificacion serial PRIMARY KEY,
    documento_estudiante int NOT NULL,
    id_asignatura int NOT NULL,
    nota float NOT NULL,
    fecha date,
    CONSTRAINT fk_estudiante FOREIGN KEY (documento_estudiante) references escuela.alumnos(documento),
    CONSTRAINT fk_asignatura FOREIGN KEY (id_asignatura) references escuela.asignatura(id)
);

CREATE TABLE escuela.estudiante_asistencia (
    id_asistencia serial PRIMARY KEY,
    documento_estudiante int NOT NULL,
    id_asignatura int NOT NULL,
    asiste boolean,
    fecha date,
    CONSTRAINT fk_estudiante FOREIGN KEY (documento_estudiante) references escuela.alumnos(documento),
    CONSTRAINT fk_asignatura FOREIGN KEY (id_asignatura) references escuela.asignatura(id)
);

CREATE TABLE escuela.estudiante_asignatura (
    id serial PRIMARY KEY,
    documento_estudiante int NOT NULL,
    id_asignatura int NOT NULL,
    estado boolean,
    CONSTRAINT fk_estudiante FOREIGN KEY (documento_estudiante) references escuela.alumnos(documento),
    CONSTRAINT fk_asignatura FOREIGN KEY (id_asignatura) references escuela.asignatura(id)
);

CREATE TABLE escuela.profesor_asignatura (
    id_asignatura_profesor serial PRIMARY KEY,
    documento_profesor int NOT NULL,
    id_asignatura int NOT NULL,
    CONSTRAINT fk_profesor FOREIGN KEY (documento_profesor) references escuela.profesores(documento),
    CONSTRAINT fk_asignatura FOREIGN KEY (id_asignatura) references escuela.asignatura(id)
);

CREATE TABLE escuela.profesor_grupo (
    id_grupo_profesor serial PRIMARY KEY,
    documento_profesor int NOT NULL,
    id_grupoGrado serial NOT NULL,
    CONSTRAINT fk_profesor FOREIGN KEY (documento_profesor) references escuela.profesores(documento),
    CONSTRAINT fk_grupoGrado FOREIGN KEY (id_grupoGrado) references escuela.gradoGrupo(id_grupoGrado)
);