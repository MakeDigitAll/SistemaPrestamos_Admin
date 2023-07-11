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
  correoElectronico VARCHAR(100) NOT NULL CHECK (LENGTH(correoElectronico) >= 1 AND LENGTH(correoElectronico) <= 100),
  usuarioPassword VARCHAR(100) NOT NULL CHECK (LENGTH(usuarioPassword) >= 1 AND LENGTH(usuarioPassword) <= 100),
  nombres VARCHAR(50) NOT NULL CHECK (LENGTH(nombres) >= 1 AND LENGTH(nombres) <= 50),
  apellidos VARCHAR(50) NOT NULL CHECK (LENGTH(apellidos) >= 1 AND LENGTH(apellidos) <= 50),
  numeroTelefono VARCHAR(10) CHECK (LENGTH(numeroTelefono) = 10),
  imagenPerfil BYTEA,
  isActive BOOLEAN DEFAULT false,
  codigoReferencia VARCHAR(6) CHECK (LENGTH(codigoReferencia) >= 1 AND LENGTH(codigoReferencia) <= 6),
  createdAt DATE DEFAULT NOW(),
  updatedAt DATE DEFAULT NOW(),
  isDeleted BOOLEAN DEFAULT false,
  isModified BOOLEAN DEFAULT false,
  isPasswordChanged BOOLEAN DEFAULT false,
  isEmailConfirmed BOOLEAN DEFAULT false
);



CREATE TABLE usuariosAfiliados (
  idUsuarioAfiliado SERIAL PRIMARY KEY,
  correoElectronico VARCHAR(100) NOT NULL CHECK (LENGTH(correoElectronico) >= 1 AND LENGTH(correoElectronico) <= 100),
  usuarioPassword VARCHAR(100) NOT NULL CHECK (LENGTH(usuarioPassword) >= 1 AND LENGTH(usuarioPassword) <= 100),
  nombres VARCHAR(50) NOT NULL CHECK (LENGTH(nombres) >= 1 AND LENGTH(nombres) <= 50),
  apellidos VARCHAR(50) NOT NULL CHECK (LENGTH(apellidos) >= 1 AND LENGTH(apellidos) <= 50),
  numeroTelefono VARCHAR(10) NOT NULL CHECK (LENGTH(numeroTelefono) = 10),
  imagenPerfil BYTEA,
  isActive BOOLEAN DEFAULT false,
  codigoReferencia VARCHAR(6) CHECK (LENGTH(codigoReferencia) >= 1 AND LENGTH(codigoReferencia) <= 6),
  createdAt DATE DEFAULT NOW(),
  updatedAt DATE DEFAULT NOW(),
  isDeleted BOOLEAN DEFAULT false,
  isModified BOOLEAN DEFAULT false,
  isPasswordChanged BOOLEAN DEFAULT false,
  isEmailConfirmed BOOLEAN DEFAULT false
);



CREATE TABLE suscripciones (
  idSuscripcion SERIAL PRIMARY KEY,
  idUsuarioPrestamista INTEGER NOT NULL REFERENCES usuariosPrestamistas (idUsuarioPrestamista),
  tipoSuscripcion VARCHAR(50) NOT NULL CHECK (LENGTH(tipoSuscripcion) >= 1 AND LENGTH(tipoSuscripcion) <= 50),
  fechaInicio DATE NOT NULL,
  fechaFin DATE NOT NULL,
  estadoSuscripcion VARCHAR(30) NOT NULL CHECK (LENGTH(estadoSuscripcion) >= 1 AND LENGTH(estadoSuscripcion) <= 30)
);


CREATE TABLE prestamos (
  idPrestamo SERIAL PRIMARY KEY,
  idUsuarioPrestamista INTEGER NOT NULL REFERENCES usuariosPrestamistas (idUsuarioPrestamista),
  idUsuarioAfiliado INTEGER NOT NULL REFERENCES usuariosAfiliados (idUsuarioAfiliado),
  monto DECIMAL NOT NULL,
  tasaInteres DECIMAL NOT NULL,
  fechaPrestamo DATE NOT NULL,
  fechaProximoPago DATE NOT NULL,
  fechaFinPago DATE NOT NULL,
  historialPagos VARCHAR(255) NOT NULL CHECK (LENGTH(historialPagos) >= 1 AND LENGTH(historialPagos) <= 255),
  estado VARCHAR(30) NOT NULL CHECK (LENGTH(estado) >= 1 AND LENGTH(estado) <= 30)
);


CREATE TABLE calidadPrestamista (
  idCalidadPrestamista SERIAL PRIMARY KEY,
  idUsuarioPrestamista INTEGER NOT NULL REFERENCES usuariosPrestamistas (idUsuarioPrestamista),
  montoDesde DECIMAL NOT NULL,
  montoHasta DECIMAL NOT NULL,
  numeroUsuarios DECIMAL NOT NULL,
  nombreNivel VARCHAR(255) NOT NULL,
  costoMembresia DECIMAL
);




--Insertar un administrador
INSERT INTO Administradores (correo_electronico, passwd, nombres, apellidos)
VALUES ('pablo@makedigitall.com', '123', 'Pablo', 'Alvarez');

--Para mostrar todas las tablas
\dt