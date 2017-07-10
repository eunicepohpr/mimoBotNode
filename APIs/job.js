var job = module.exports = {};
var Job = require('../Models').Job;
var model = require('../Models');

/**
 * Get all the Jobs from the database arrange by ID
 * @returns {string} JSON format of all the Job details from the database
 */
job.getAllJob = function () {
    return new Promise(function (resolve, reject) {
        Job.findAll({
            order: [],
            attributes: ['JobID', 'JobTitle', 'JobDescription', 'JobQualification', 'JobResponsibilities',
                'JobPostDate', 'JobPostalCode', 'JobAddress'],
            include: [
                { model: model.Industry, attributes: ['IndustryName'], through: { attributes: [] } },
                { model: model.JobFunction, attributes: ['JobFunctionName'], through: { attributes: [] } },
                { model: model.JobType, attributes: ['JobType'] },
                { model: model.Company, attributes: ['CompanyName', 'CompanyAddress', 'CompanyPostalCode'] },
                {
                    model: model.Salary,
                    attributes: ['SalaryFrom', 'SalaryTo'],
                    include: [{ model: model.Currency, attributes: ['Symbol', 'CurrencyCode'] }]
                },
                { model: model.Country, attributes: ['CountryName'] }]
        }).then(function (data) {
            resolve(JSON.stringify(data));
        }).catch(function (error) {
            console.log("Error: " + error)
            reject(error.toString());
        });
    })
} //end of getAllJob()

/**
 * Get the information of one Job from the database based on the ID 
 * @param {int} id - Job's ID
 * @returns {string} JSON format of one Job details
 */
job.getOneJob = function (id) {
    return new Promise(function (resolve, reject) {
        Job.findOne({
            where: { JobID: id },
            attributes: ['JobID', 'JobTitle', 'JobDescription', 'JobQualification', 'JobResponsibilities',
                'JobPostDate', 'JobPostalCode', 'JobAddress'],
            include: [
                { model: model.Industry, attributes: ['IndustryName'], through: { attributes: [] } },
                { model: model.JobFunction, attributes: ['JobFunctionName'], through: { attributes: [] } },
                { model: model.JobType, attributes: ['JobType'] },
                { model: model.Company, attributes: ['CompanyName', 'CompanyAddress', 'CompanyPostalCode'] },
                {
                    model: model.Salary,
                    attributes: ['SalaryFrom', 'SalaryTo'],
                    include: [{ model: model.Currency, attributes: ['Symbol', 'CurrencyCode'] }]
                },
                { model: model.Country, attributes: ['CountryName'] }]
        }).then(function (data) {
            resolve(JSON.stringify(data));
        }).catch(function (error) {
            console.log("Error: " + error)
            reject(error.toString());
        });
    })
} //end of getOneJob()

/** NOT DONE
 * Get all Jobs from the database based on Industries, Job Functions and more variety search from other columns
 * @param {array} industry - Array of industry name
 * @param {array} jFuntion - Array of jobfunction name
 * @param {array} jType - Array of jobtype
 * @returns {string} JSON format of all the filtered Jobs
 */
job.getFilteredJob = function (industry, jFuntion, jType) {
    return new Promise(function (resolve, reject) {
        var everything = [], name = [], title = [], des = [], qual = [], res = [];
        for (i = 0; i < industry.length; i++) {
            name.push({ '$Industries.IndustryName$': { $like: '%' + industry[i] + '%' } });
            title.push({ JobTitle: { $like: '%' + industry[i] + '%' } });
            des.push({ JobDescription: { $like: '%' + industry[i] + '%' } });
            qual.push({ JobQualification: { $like: '%' + industry[i] + '%' } });
            res.push({ JobResponsibilities: { $like: '%' + industry[i] + '%' } });
        }
        for (i = 0; i < jFuntion.length; i++) {
            name.push({ '$JobFunctions.JobFunctionName$': { $like: '%' + jFuntion[i] + '%' } });
            title.push({ JobTitle: { $like: '%' + jFuntion[i] + '%' } });
            des.push({ JobDescription: { $like: '%' + jFuntion[i] + '%' } });
            qual.push({ JobQualification: { $like: '%' + jFuntion[i] + '%' } });
            res.push({ JobResponsibilities: { $like: '%' + jFuntion[i] + '%' } });
        }
        for (i = 0; i < jType.length; i++) {
            title.push({ JobTitle: { $like: '%' + jType[i] + '%' } });
            des.push({ JobDescription: { $like: '%' + jType[i] + '%' } });
            qual.push({ JobQualification: { $like: '%' + jType[i] + '%' } });
            res.push({ JobResponsibilities: { $like: '%' + jType[i] + '%' } });
        }
        everything.push(name);
        everything.push(title);
        everything.push(des);
        everything.push(qual);
        everything.push(res);
        var whereStuff = { $or: everything }
        console.log(JSON.stringify(whereStuff))
        Job.findAll({
            where: whereStuff,
            attributes: ['JobID', 'JobTitle', 'JobDescription', 'JobQualification', 'JobResponsibilities',
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
        }).then(function (data) {
            resolve(JSON.stringify(data))
        }).catch(function (error) {
            console.log("Error: " + error)
            reject(error.toString());
        });
    })
} //end of getFilteredJob()

/**
 * Get all Jobs from the database based on User search criteria - Industries, Job Functions and Job Types
 * @param {array} industry - Array of industry name
 * @param {array} jFuntion - Array of jobfunction name
 * @param {array} jType - Array of jobtype
 * @returns {string} JSON format of all the filtered Jobs
 */
job.getUserJob = function (industry, jFuntion, jType) {
    return new Promise(function (resolve, reject) {
        var whereInd;
        if (industry.length == 0) { whereInd = {}; }
        else {
            var ind = [];
            for (i = 0; i < industry.length; i++) {
                ind.push({ IndustryName: { $like: '%' + industry[i] + '%' } });
            }
            whereInd = { $or: ind };
        }
        var wherejFunction;
        if (jFuntion.length == 0) { wherejFunction = {}; }
        else {
            var jf = [];
            for (i = 0; i < jFuntion.length; i++) {
                jf.push({ JobFunctionName: { $like: '%' + jFuntion[i] + '%' } });
            }
            wherejFunction = { $or: jf };
        }
        var wherejType;
        if (jType.length == 0) { wherejType = {}; }
        else {
            var jt = [];
            for (i = 0; i < jType.length; i++) {
                jt.push({ JobType: { $like: '%' + jType[i] + '%' } });
            }
            wherejType = { $or: jt };
        }
        Job.findAll({
            attributes: ['JobID', 'JobTitle', 'JobDescription', 'JobQualification', 'JobResponsibilities',
                'JobPostDate', 'JobPostalCode', 'JobAddress'],
            include: [
                {
                    model: model.Industry,
                    where: whereInd,
                    attributes: ['IndustryName'], through: { attributes: [] }
                },
                {
                    model: model.JobFunction,
                    where: wherejFunction,
                    attributes: ['JobFunctionName'], through: { attributes: [] }
                },
                {
                    model: model.JobType,
                    where: wherejType,
                    attributes: ['JobType']
                },
                { model: model.Company, attributes: ['CompanyName', 'CompanyAddress', 'CompanyPostalCode'] },
                {
                    model: model.Salary,
                    attributes: ['SalaryFrom', 'SalaryTo'],
                    include: [{ model: model.Currency, attributes: ['Symbol', 'CurrencyCode'] }]
                },
                { model: model.Country, attributes: ['CountryName'] }]
        }).then(function (data) {
            resolve(JSON.stringify(data));
        }).catch(function (error) {
            console.log("Error: " + error)
            reject(error.toString());
        });
    });
} //end of getUserJob()

/**
 * Add Job into the database
 * @param {string} salary - JSON format of the Salary details
 * @param {string} job - JSON format of the Job details
 * @param {array} indID - Array of industry id
 * @param {array} jfID - Array of job function id
 * @returns {string} Information of new Job added in JSON format
 */
job.addJob = function (salary, job, indID, jfID) {
    return new Promise(function (resolve, reject) {
        model.Salary.create(salary).then(function (newSalary) {
            var SalaryID = newSalary.SalaryID;
            job["SalaryID"] = SalaryID;
            Job.create(job).then(function (newJob) {
                indID.forEach(function (currentId) {
                    newJob.addIndustry(currentId).then(function (result) { });
                });
                jfID.forEach(function (currentID) {
                    newJob.addJobFunction(currentID).then(function (result) { });
                });
                resolve(JSON.stringify(newJob));
            }).catch(function (error) {
                console.log("Error: " + error);
                reject(error.toString());
            });
        }).catch(function (error) {
            console.log("Error: " + error);
            reject(error.toString());
        });
    });
} //end of addJob()
