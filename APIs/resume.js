var resume = module.exports = {};
var Resume = require('../Models').Resume;

/**
 * Get all the User Resumes
 * @param {int} userId - User's ID
 * @returns {string} JSON format of all the Resume details 
 */
resume.getAllResume = function (userId) {
    return new Promise(function (resolve, reject) {
        Resume.findAll({
            where: { UserID: userId, RecordStatus: { $not: 'D' } },
            attributes: { exclude: ['RecordStatus', 'LastUpdated'] }
        }).then(function (data) {
            resolve(JSON.stringify(data));
        }).catch(function (error) {
            console.log("Error: " + error)
            reject({ msg: "An error occurred in the server, Please try again", errMsg: error.toString() });
        });
    });
}; //end of getAllResume()

/**
 * Add Resume details
 * @param {string} resume - resume details
 * @returns {string} JSON format of the information of the new Resume added
 */
resume.addResume = function (resume) {
    return new Promise(function (resolve, reject) {
        Resume.create(resume)
            .then(function (result) {
                resolve(JSON.stringify(result))
            }).catch(function (error) {
                console.log("Error: " + eror)
                reject({ msg: "An error occurred in the server, Please try again", errMsg: error.toString() });
            });
    });
}; //end of addResume()

/**
 * Update Resume information into the database
 * @param {int} id - Resume ID
 * @param {string} description - Description of resume
 * @returns {string} JSON format of updated Resume information
 */
resume.updateAttributes = function (id, description) {
    return new Promise(function (resolve, reject) {
        Resume.find({ where: { ResumeID: id } })
            .then(function (oneResume) {
                if (oneResume) {
                    oneResume.update({ LastUpdated: '', Description: description })
                        .then(function (update) {
                            resolve(JSON.stringify(update))
                        }).catch(function (error) {
                            console.log("Error: " + error)
                            reject({ msg: "An error occurred in the server, Please try again", errMsg: error.toString() });
                        });
                } else {
                    reject({ msg: "Failed to update Resume" });
                }
            }).catch(function (error) {
                console.log("Error: " + error)
                reject({ msg: "An error occurred in the server, Please try again", errMsg: error.toString() });
            });
    });
}; //end of updatAttributes()


/**
 * Remove Resume information into the database
 * @param {int} id - ResumeId to remove
 */
resume.deleteResume = function (id) {
    return new Promise(function (resolve, reject) {
        Resume.find({ where: { ResumeID: id } })
            .then(function (one) {
                if (one) {
                    one.update({ RecordStatus: 'D', LastUpdated: '' }, { fields: ['RecordStatus', 'LastUpdated'] })
                        .then(function (update) {
                            resolve(JSON.stringify(update))
                        }).catch(function (error) {
                            console.log("Error: " + error)
                            reject({ msg: "An error occurred in the server, Please try again", errMsg: error.toString() });
                        });
                } else {
                    reject({ msg: "Failed to delete Resume" });
                }
            }).catch(function (error) {
                console.log("Error: " + error)
                reject({ msg: "An error occurred in the server, Please try again", errMsg: error.toString() });
            });
    });
};// end of deleteResume()