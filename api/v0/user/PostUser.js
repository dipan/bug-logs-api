const MongoDBUtility = require('./../../../mongodb/MongoDBUtility');
const ResponseStatus = require('./../../ResponseStatus');

class PostUser {
    execute(parameters) {
        console.log("parameters.headers = " + JSON.stringify(parameters.headers, null, 2));
        console.log(parameters.params);
        console.log(parameters.query);
        console.log(parameters.body);

        return new Promise(async (resolve, reject) => {
            try {
                let mongoDBUtility = new MongoDBUtility();
                let insertResult = await mongoDBUtility.insertData("user", parameters.body);

                let response = new Object();
                response["message"] = "Successfully added data";
                response["result"] = insertResult;
                resolve(ResponseStatus.CREATED(response));
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = PostUser;
