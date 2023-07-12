const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../config/config");
class BM extends Model {}

BM.init(
  {
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  style: {
    type: DataTypes.STRING,
    validate: {
      isIn: [["liquid", "soft", "normal", "hard", "solid"]],
    },
    allowNull: false,
    defaultValue: "normal",
  },
  styleRating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amount: {
    type: DataTypes.STRING,
    validate: {
      isIn: [["little", "normal", "a lot"]],
    },
    allowNull: false,
    defaultValue: "normal",
  },
  amountRating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  speed: {
    type: DataTypes.STRING,
    validate: {
      isIn: [["less than 5 mins", "5 - 10 mins", "more than 10 mins"]],
    },
    allowNull: false,
    defaultValue: "5 - 10 mins",
  },
  speedRating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comfort: {
    type: DataTypes.STRING,
    validate: {
      isIn: [
        ["very uncomfortable", "uncomfortable", "it's okay", "nice", "great"],
      ],
    },
    allowNull: false,
    defaultValue: "it's okay",
  },
  comfortRating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},
{
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: "BM",
  
}
);

module.exports = BM;
