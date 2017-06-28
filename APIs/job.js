var job = module.exports = {};
var Job = require('../models').Job;
var model = require('../models');

job.api = {

    getAllJob: function () {
        return new Promise((resolve, reject) => {
            Job.findAll({
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
            })
                .then((data) => {
                    resolve(data)
                })
        })
    },
    getOneJob: function (id) {
        return new Promise((resolve, reject) => {
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
            })
                .then((data) => {
                    resolve(data);
                })
        })
    },
    getFilteredJob: function () {
        return new Promise((resolve, reject) => {
            var industry = 'aerospace'
            var jFuntion = 'engineering'
            var jType = 'full time'
            Job.findAll({
                where: {
                    $or: [
                        {
                            $or:
                            [
                                { '$Industries.IndustryName$': { $like: '%' + industry + '%' } },
                                { '$JobFunctions.JobFunctionName$': { $like: '%' + jFuntion + '%' } }
                            ]
                        },
                        {
                            $or:
                            [
                                { JobTitle: { $like: '%' + industry + '%' } },
                                { JobTitle: { $like: '%' + jFuntion + '%' } }
                            ]
                        },
                        {
                            $or:
                            [
                                { JobDescription: { $like: '%' + industry + '%' } },
                                { JobDescription: { $like: '%' + jFuntion + '%' } }
                            ]
                        },
                        {
                            $or:
                            [
                                { JobQualification: { $like: '%' + industry + '%' } },
                                { JobQualification: { $like: '%' + jFuntion + '%' } }
                            ]
                        },
                        {
                            $or:
                            [
                                { JobResponsibilities: { $like: '%' + industry + '%' } },
                                { JobResponsibilities: { $like: '%' + jFuntion + '%' } }
                            ]
                        }
                    ]
                    // ,
                    // '$JobTypes.JobType$': { $like: '%' + jType + '%' }
                },
                attributes: ['JobID', 'JobTitle', 'JobDescription', 'JobQualification', 'JobResponsibilities',
                    'JobPostDate', 'JobPostalCode', 'JobAddress'],
                include: [
                    {
                        model: model.Industry,
                        as: 'Industries',
                        attributes: ['IndustryName'], through: { attributes: [] }
                    },
                    {
                        model: model.JobFunction,
                        as: 'JobFunctions',
                        attributes: ['JobFunctionName'], through: { attributes: [] }
                    },
                    {
                        model: model.JobType,
                       // as: 'JobTypes',
                        attributes: ['JobType']
                    },
                    { model: model.Company, attributes: ['CompanyName', 'CompanyAddress', 'CompanyPostalCode'] },
                    {
                        model: model.Salary,
                        attributes: ['SalaryFrom', 'SalaryTo'],
                        include: [{ model: model.Currency, attributes: ['Symbol', 'CurrencyCode'] }]
                    },
                    { model: model.Country, attributes: ['CountryName'] }]
            })
                .then((data) => {
                    resolve(data)
                })
        })
    }
}