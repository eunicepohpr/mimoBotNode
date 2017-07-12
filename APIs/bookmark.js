var bookmark = module.exports = {};
var Bookmark = require('../Models').Bookmark;
var model = require('../Models');

/**
 * Get all the Jobs that are bookmarked
 * @param {int} userId - UserID
 * @returns {string} JSON format of all job details that are bookmarked
 */
bookmark.getAllBookmark = function (userId) {
    return new Promise(function (resolve, reject) {
        Bookmark.findAll({
            where: { UserID: userId, RecordStatus: { $not: 'D' } },
            include: [{
                model: model.Job, attributes: ['JobID', 'JobTitle', 'JobDescription', 'JobQualification', 'JobResponsibilities',
                    'JobPostDate', 'JobPostalCode', 'JobAddress'],
                include: [
                    { model: model.Industry, as: 'Industries', attributes: ['IndustryName'], through: { attributes: [] } },
                    { model: model.JobFunction, as: 'JobFunctions', attributes: ['JobFunctionName'], through: { attributes: [] } },
                    { model: model.JobType, attributes: ['JobType'] },
                    { model: model.Company, attributes: ['CompanyName', 'CompanyAddress', 'CompanyPostalCode'] },
                    {
                        model: model.Salary, attributes: ['SalaryFrom', 'SalaryTo'],
                        include: [{ model: model.Currency, attributes: ['Symbol', 'CurrencyCode'] }]
                    },
                    { model: model.Country, attributes: ['CountryName'] }]
            }]
        }).then(function (data) {
            resolve(JSON.stringify(data))
        }).catch(function (error) {
            console.log("Error: " + error)
            reject(error.toString());
        });
    });
}; //end of getAllBookmark()

/**
 * Add job that is bookmark
 * @param {string} bookmark - JSON format of the bookmark details
 * @returns {string} JSON format of the new Bookmark added
 */
bookmark.addBookmark = function (bookmark) {
    return new Promise(function (resolve, reject) {
        Bookmark.find({ where: { JobID: bookmark.JobID, UserID: bookmark.UserID } })
            .then(function (exist) {
                if (exist) {
                    exist.update({ RecordStatus: 'M', LastUpdated: '' }, { fields: ['RecordStatus', 'LastUpdated'] })
                        .then(function (update) {
                            resolve(JSON.stringify(update))
                        }).catch(function (error) {
                            console.log("Error: " + error)
                            reject(error.toString());
                        });
                } else {
                    Bookmark.create(bookmark)
                        .then(function (newBookmark) {
                            resolve(JSON.stringify(newBookmark));
                        }).catch(function (error) {
                            console.log("Error: " + error)
                            reject(error.toString());
                        });
                }
            }).catch(function (error) {
                console.log("Error: " + error)
                reject(error.toString());
            });
    });
}; //end of addBookmark()

/**
 * remove job from Bookmark
 * @param {string} bookmark - JSON format of the bookmark details
 */
bookmark.removeBookmark = function (jobId, userId) {
    return new Promise(function (resolve, reject) {
        Bookmark.find({ where: { JobID: jobId, UserID: userId } })
            .then(function (bm) {
                if (bm) {
                    bm.update({ RecordStatus: 'D', LastUpdated: '' }, { fields: ['RecordStatus', 'LastUpdated'] })
                        .then(function (update) {
                            resolve(JSON.stringify(update))
                        }).catch(function (error) {
                            console.log("Error: " + error)
                            reject(error.toString());
                        });
                }
            }).catch(function (error) {
                console.log("Error: " + error)
                reject(error.toString());
            });
    });
};// end of removeBookmark()