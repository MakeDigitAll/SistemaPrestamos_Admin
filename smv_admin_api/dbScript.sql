CREATE DATABASE sistema_prestamos;

-- Conectar a la base de datos
\c sistema_prestamos;

-- Crear la tabla de administradores
CREATE TABLE Administradores (
  idAdmin SERIAL PRIMARY KEY,
  correo_electronico VARCHAR(255),
  passwd VARCHAR(255),
  nombres VARCHAR(255),
  apellidos VARCHAR(255)
);

--Insertar un administrador
INSERT INTO Administradores (correo_electronico, passwd, nombres, apellidos)
VALUES ('pablo@makedigitall.com', 'rm7DS6YkR', 'Pablo Javier', 'Alvarez Ramos');