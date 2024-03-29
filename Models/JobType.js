//JobType Model
module.exports = function (sequelize, DataTypes) {
    var JobType = sequelize.define('JobType', {
        JobTypeID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            get: function () {
                return this.getDataValue('JobTypeID');
            },
            set: function (val) {
                this.setDataValue('JobTypeID', val);
            }
        },
        JobType: {
            type: DataTypes.STRING,
            get: function () {
                return this.getDataValue('JobType');
            },
            set: function (val) {
                this.setDataValue('JobType', val);
            }
        },
        Synonyms: {
            type: DataTypes.STRING,
            get: function () {
                return this.getDataValue('Synonyms');
            },
            set: function (val) {
                this.setDataValue('Synonyms', val);
            }
        },
        RecordStatus: {
            type: DataTypes.STRING,
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
            tableName: 'jobtype',
            classMethods: {
                associate: function (models) {
                    JobType.hasMany(models.Job, { foreignKey: 'JobTypeID', onDelete: 'CASCADE' });
                    //JobType.hasMany(models.UserSearch, { foreignKey: 'JobTypeID', onDelete: 'CASCADE' });
                }
            },
        });
    return JobType;
};

