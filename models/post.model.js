
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("posts", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        excerpt: {
            type: DataTypes.TEXT
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        featured: {
            type: DataTypes.BOOLEAN
        },
        photo: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: true
    });
  
    return Post;
};