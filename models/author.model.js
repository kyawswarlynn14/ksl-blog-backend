module.exports = (sequelize, DataTypes) => {
    const Author = sequelize.define("authors", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        bio: {
          type: DataTypes.STRING
        },
        photo: {
          type: DataTypes.STRING
        }
    }, {
        timestamps: true
    });
  
    return Author;
};