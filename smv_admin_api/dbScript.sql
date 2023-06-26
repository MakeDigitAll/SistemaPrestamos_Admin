CREATE DATABASE sistema_prestamos;

-- Conectar a la base de datos
\c sistema_prestamos;

CREATE TABLE Administradores (
  idAdmin SERIAL PRIMARY KEY,
  correo_electronico VARCHAR(255),
  passwd VARCHAR(255),
  nombres VARCHAR(255),
  apellidos VARCHAR(255)
);

CREATE TABLE Usuarios (
    idUsuario SERIAL PRIMARY KEY,
    nombres VARCHAR(255),
    apellidos VARCHAR(255),
    correo_electronico VARCHAR(255),
    passwd VARCHAR(255),
    tipoUsuario VARCHAR(255),
);

CREATE TABLE Prestamos (
    idPrestamo SERIAL PRIMARY KEY,
    idUsuario INT REFERENCES Usuarios(ID_Usuario),
    Monto DECIMAL,
    tasaInteres DECIMAL,
    fechaPrestamo DATE,
    fechaProximoPago DATE,
    fechaFinPago DATE,
    historialPagos VARCHAR(255),
    estado VARCHAR(255),
);

CREATE TABLE Suscripciones (
    idSuscipcion SERIAL PRIMARY KEY,
    idUsuario INT REFERENCES Usuarios(ID_Usuario),
    tipoSuscripcion VARCHAR(255),
    fechaInicio DATE,
    fechaFin DATE,
    estadoSuscripcion VARCHAR(255),
);

--Insertar un administrador
INSERT INTO Administradores (correo_electronico, passwd, nombres, apellidos)
VALUES ('pablo@makedigitall.com', 'rm7DS6YkR', 'Pablo Javier', 'Alvarez Ramos');