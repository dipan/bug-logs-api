const uuidv4 = require('uuid/v4');
const MongoDBUtility = require('./../../../mongodb/MongoDBUtility');
const ResponseStatus = require('./../../ResponseStatus');

class PostLog {
    execute(parameters) {
        return new Promise(async (resolve, reject) => {
            try {
                let id = uuidv4();
                parameters.body["_id"] = id;

                let mongoDBUtility = new MongoDBUtility();
                let insertResult = await mongoDBUtility.insertData("log", parameters.body);

                let response = new Object();
                response["message"] = "Successfully added data";
                response["id"] = id;
                response["result"] = insertResult;
                resolve(ResponseStatus.CREATED(response));
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = PostLog;
