var express = require('express');
var router = express.Router();
var path = require('path');
var wit = require(path.resolve('./APIs/wit.js'));
var witdata = require(path.resolve('./APIs/witdata.js'));

/* Test Wit Controller
 * http://localhost:8680/api/wit
*/
router.get('/', function (req, res, next) {
    res.send("Available");
});

/** 
 * Process Nature Language
 * http://localhost:8680/api/wit
 * Headers: x-access-token (JWT Token) | For Testing - userid
 * Body: JSON(application/json)
 * {
        "userMsg": "",
        "id": "1234",
        "context": {}
    }
*/
router.post('/', function (req, res, next) {
    var userMsg = req.body.userMsg;
    var sessionId = req.body.id;
    var context = req.body.context;
    var userid = req.headers.userid;
    if (!userid) { res.send({ success: false, message: "An error occurred in the server, Please try again" }) }
    wit.NLP(sessionId, userMsg, context, userid)
        .then(function (result) {
            res.send(result);
        }).catch(function (error) {
            var response = { success: false, message: error.msg, errMessage: error.errMsg ? error.errMsg : "" };
            res.send(response);
        });
});

/* Populate Some Data into Wit 
 * http://localhost:8680/api/wit/data
*/
router.get('/data', function (req, res, next) {
    witdata.loadAllData()
        .then(function () {
            res.send("Data loaded into wit!")
        })
});

module.exports = router;
