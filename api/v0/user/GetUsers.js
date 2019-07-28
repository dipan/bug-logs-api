const MongoDBUtility = require('./../../../mongodb/MongoDBUtility');

class GetUser {
    execute(parameters, context) {
        console.log("parameters.headers = " + JSON.stringify(parameters.headers, null, 2));
        console.log(parameters.params);
        console.log(parameters.query);
        console.log(parameters.body);

        let mongoDBUtility = new MongoDBUtility();
        mongoDBUtility.getData("user");

        let response = new Object();
        response["message"] = "Console log";
        return response;
    }
}

module.exports = GetUser;
