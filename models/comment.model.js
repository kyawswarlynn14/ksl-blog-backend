module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("comments", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        timestamps: true
    });
  
    return Comment;
};