var bcrypt = require("bcrypt-nodejs");
var moment = require('moment');
//User model
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        UserID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            get: function () {
                return this.getDataValue('UserID');
            },
            set: function (val) {
                this.setDataValue('UserID');
            }
        },
        Email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            get: function () {
                return this.getDataValue('Email');
            },
            set: function (val) {
                this.setDataValue('Email', val);
            }
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: true,
            get: function () {
                return this.getDataValue('Password');
            },
            set: function (val) {
                this.setDataValue('Password', val);
            }
        },
        UserName: {
            type: DataTypes.STRING,
            allowNull: false,
            get: function () {
                return this.getDataValue('UserName');
            },
            set: function (val) {
                this.setDataValue('UserName', val);
            }
        },
        DateOfBirth: {
            type: DataTypes.DATE,
            allowNull: true,
            get: function () {
                return this.getDataValue('DateOfBirth');
            },
            set: function (val) {
                this.setDataValue('DateOfBirth', moment(val).toISOString());
            }
        },
        Picture:{
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "https://www.drupal.org/files/profile_default.png",
            get: function () {
                return this.getDataValue('Picture');
            },
            set: function (val) {
                this.setDataValue('Picture', val);
            }
        },
        Address: {
            type: DataTypes.STRING,
            allowNull: true,
            get: function () {
                return this.getDataValue('Address');
            },
            set: function (val) {
                this.setDataValue('Address', val);
            }
        },
        PostalCode: {
            type: DataTypes.STRING,
            allowNull: true,
            get: function () {
                return this.getDataValue('PostalCode');
            },
            set: function (val) {
                this.setDataValue('PostalCode', val);
            }
        },
        Gender: {
            type: DataTypes.STRING(10),
            allowNull: true,
            get: function () {
                return this.getDataValue('Gender');
            },
            set: function (val) {
                this.setDataValue('Gender', val);
            }
        },
        DateRegistered: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            get: function () {
                return this.getDataValue('DateRegistered');
            },
            set: function (val) {
                this.setDataValue('DateRegistered', val.toISOString());
            }
        },
        DeviceToken: {
            type: DataTypes.STRING(1000),
            allowNull: true,
            get: function () {
                return this.getDataValue('DeviceToken');
            },
            set: function (val) {
                this.setDataValue('DeviceToken', val);
            }
        },
        Verified: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
            get: function () {
                return this.getDataValue('Verified');
            },
            set: function (val) {
                this.setDataValue('Verified', val);
            }
        },
        RecordStatus: {
            type: DataTypes.STRING(10),
            allowNull: false,
            defaultValue: 'A',
            get: function () {
                return this.getDataValue('RecordStatus');
            },
            set: function (val) {
                this.setDataValue('RecordStatus', val);
            }
        },
        LastUpdated: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            get: function () {
                return this.getDataValue('LastUpdated');
            },
            set: function () {
                this.setDataValue('LastUpdated', new Date().toISOString().slice(0, 19));
            }
        }
    },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'user',
            classMethods: {
                associate: function (models) {
                    User.hasMany(models.WorkExperience, { foreignKey: 'UserID', onDelete: 'CASCADE' });
                    User.hasMany(models.Bookmark, { foreignKey: 'UserID', onDelete: 'CASCADE' });
                    User.hasMany(models.Notification, { foreignKey: 'UserID', onDelete: 'CASCADE' });
                    User.hasMany(models.Resume, { foreignKey: 'UserID', onDelete: 'CASCADE' });
                    User.hasMany(models.UserSearch, { foreignKey: 'UserID', onDelete: 'CASCADE' });
                    User.belongsTo(models.Country, { foreignKey: 'CountryID', onDelete: 'CASCADE' });
                },
                generateHash: function (password) {
                    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
                }
            },
            instanceMethods: {
                validPassword: function (password) {
                    return bcrypt.compareSync(password, this.Password);
                }
            }
        });
    return User;
};