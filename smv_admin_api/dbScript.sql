CREATE DATABASE sistema_prestamos;

-- Conectar a la base de datos
\c sistema_prestamos;
 
CREATE TABLE administradores (
  idAdministrador SERIAL PRIMARY KEY,
  correoElectronico VARCHAR(100) NOT NULL,
  adminPassword VARCHAR(100) NOT NULL,
  nombres VARCHAR(50) NOT NULL,
  apellidos VARCHAR(50) NOT NULL,
  imagenPerfil BYTEA,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW(),
  isDeleted BOOLEAN DEFAULT false,
  isModified BOOLEAN DEFAULT false
);

CREATE TABLE usuariosPrestamistas (
  idUsuarioPrestamista SERIAL PRIMARY KEY,
  correoElectronico VARCHAR(100) NOT NULL,
  usuarioPassword VARCHAR(100) NOT NULL,
  nombres VARCHAR(50) NOT NULL,
  apellidos VARCHAR(50) NOT NULL,
  numeroTelefono VARCHAR(20),
  imagenPerfil BYTEA,
  isActive BOOLEAN DEFAULT false,
  codigoReferencia VARCHAR(6),
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW(),
  isDeleted BOOLEAN DEFAULT false,
  isModified BOOLEAN DEFAULT false
);


CREATE TABLE usuariosAfiliados (
  idUsuarioAfiliado SERIAL PRIMARY KEY,
  correoElectronico VARCHAR(100) NOT NULL,
  usuarioPassword VARCHAR(100) NOT NULL,
  nombres VARCHAR(50) NOT NULL,
  apellidos VARCHAR(50) NOT NULL,
  numeroTelefono VARCHAR(20) NOT NULL,
  imagenPerfil BYTEA,
  isActive BOOLEAN DEFAULT false,
  codigoReferencia VARCHAR(6),
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW(),
  isDeleted BOOLEAN DEFAULT false,
  isModified BOOLEAN DEFAULT false
);



CREATE TABLE prestamos (
  idPrestamo SERIAL PRIMARY KEY,
  idUsuarioPrestamista INTEGER NOT NULL,
  idUsuarioAfiliado INTEGER NOT NULL,
  monto DECIMAL NOT NULL,
  tasaInteres DECIMAL NOT NULL,
  fechaPrestamo DATE NOT NULL,
  fechaProximoPago DATE NOT NULL,
  fechaFinPago DATE NOT NULL,
  historialPagos VARCHAR(255) NOT NULL,
  estado VARCHAR(30) NOT NULL,
  FOREIGN KEY (idUsuarioPrestamista) REFERENCES usuariosPrestamistas (idUsuarioPrestamista),
  FOREIGN KEY (idUsuarioAfiliado) REFERENCES usuariosAfiliados (idUsuarioAfiliado)
);


CREATE TABLE suscripciones (
  idSuscripcion SERIAL PRIMARY KEY,
  idUsuarioPrestamista INTEGER NOT NULL,
  tipoSuscripcion VARCHAR(50) NOT NULL,
  fechaInicio DATE NOT NULL,
  fechaFin DATE NOT NULL,
  estadoSuscripcion VARCHAR(30) NOT NULL,
  FOREIGN KEY (idUsuarioPrestamista) REFERENCES usuariosPrestamistas (idUsuarioPrestamista)
);



--Insertar un administrador
INSERT INTO Administradores (correo_electronico, passwd, nombres, apellidos)
VALUES ('pablo@makedigitall.com', '123', 'Pablo', 'Alvarez');

--Para mostrar todas las tablas
\dt