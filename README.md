# FYP Backend

This project consists of the backend code for a final year project (mimoBot) in Sinapore Polytechnic.

mimoBot is a cross-platform mobile application job portal using Ionic Framework, Node.js and Wit.ai, allowing users to search for jobs via a chatbot.

My Notes

### [*Sequelize*](http://docs.sequelizejs.com/)
***
**Sequelize** is a promise-based ORM for Node.js v4 and up. It supports the dialects PostgreSQL, MySQL, SQLite and MSSQL and features solid transaction support, relations, read replication and more.
+ [Setting up](http://docs.sequelizejs.com/manual/installation/getting-started)
+ [Model Definition](http://docs.sequelizejs.com/manual/tutorial/models-definition.html)
+ [Model Usage](http://docs.sequelizejs.com/manual/tutorial/models-usage.html)
+ [Querying](http://docs.sequelizejs.com/manual/tutorial/querying.html)
+ [Bulk CRUD](http://docs.sequelizejs.com/manual/tutorial/instances.html)

### [Wit.ai](https://wit.ai/)
***
Nature Language for Developers
- [Tutorials](https://wit.ai/docs/recipes)
- [HTTP API](https://wit.ai/docs/http/20170307#put--entities-:entity-id-link)
- [Node SDK](https://github.com/wit-ai/node-wit)

***
### [JSON Web Token (JWT)](https://jwt.io/)
**JSON Web Tokens** are an open, industry standard RFC 7519 method for representing claims securely between two parties.
- [Tutorial for node.js](https://www.sitepoint.com/using-json-web-tokens-node-js/)

***
### [Passport.js](http://passportjs.org)
Passport Strategies
- [Local Passport](https://www.npmjs.com/package/passport-local)
- [Facebook Passport](https://www.npmjs.com/package/passport-facebook-token)


### Firebase Cloud Messaging (Notification)
***
##### ~Server Side
- [Firebase Admin Setup](https://firebase.google.com/docs/admin/setup)
- [Sending Message](https://firebase.google.com/docs/cloud-messaging/admin/send-messages)
***
### Create config.js file
Contents in config.js

```
var config = module.exports = {}

// MySQL Credentials
config.dbCredentials = {
    'database': 'database_name',
    'username': 'root',
    'password': '',
    "host": "localhost",
    "dialect": "mysql"
}

// Wit.ai Credentials
config.wit = {
    'appId': '', //Settings > API Details > App ID
    'serverToken': '' //Settings > API Details > Server Access Token
}

// Facebook Credentials
config.facebook = {
    'clientID': '',
    "clientSecret": ''
}

// Firebase Admin Credentials
config.fbAdminCredentials = {
    // firebase admin key
}

// Gmail Credentials
config.gmail = {
    'email': '',
    'password': ''
}

// JWT Credentials
config.others = {
    'secretEmailKey': '',
    'secretPwdKey': ''
}
```
