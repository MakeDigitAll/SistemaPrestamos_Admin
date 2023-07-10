module.exports = (sequelize, Sequelize) => {
    const Niveles = sequelize.define(
        "niveles",
        {
            idNivelPretamista: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            idUsuarioPrestamista: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "usuariosPrestamistas",
                    key: "idUsuarioPrestamista",
                },
            },
            cantidadMaximaDineroPrestado: {
                type: Sequelize.DECIMAL,
                allowNull: false,
            },
            cantidadMinimaDineroPrestado: {
                type: Sequelize.DECIMAL,
                allowNull: false,
            },
            cantidadUsuariosAfiliados: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            costoMembresia: {
                type: Sequelize.DECIMAL,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        }
    );

    return Niveles;
};

