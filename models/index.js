const dbConfig = require("../config/db.config");

const {Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.sequelize = sequelize;
db.DataTypes = DataTypes;

db.authors = require("./author.model.js")(sequelize, DataTypes);
db.categories = require("./category.model.js")(sequelize, DataTypes);
db.posts = require("./post.model.js")(sequelize, DataTypes);
db.comments = require("./comment.model.js")(sequelize, DataTypes);

db.authors.hasMany(db.posts, {as: 'posts', foreignKey: 'authorId'});
db.posts.belongsTo(db.authors, {foreignKey: 'authorId'});

db.categories.hasMany(db.posts, {as: 'posts', foreignKey: 'categoryId'});
db.posts.belongsTo(db.categories, {foreignKey: 'categoryId'});

db.posts.hasMany(db.comments, {as: 'comments', foreignKey: 'postId'});
db.comments.belongsTo(db.posts, {foreignKey: 'postId'});

module.exports = db;