'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.article.belongsTo(models.user)
    }
  };
  article.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: true
      }
    },
    content: {
      type: DataTypes.TEXT
    },
    rank: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true
      }
    }
  }, {
    sequelize,
    modelName: 'article',
  });
  return article;
};