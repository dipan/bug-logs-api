const uuidv4 = require('uuid/v4');
const moment = require('moment');
const Logger = require('../../../com/Logger');
const Utility = require('../../../utility/Utility');
const MongoDBUtility = require('./../../../mongodb/MongoDBUtility');
const ResponseStatus = require('./../../ResponseStatus');
const PutUser = require('../user/PutUser');

class PostLog {
    execute(parameters) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.insertLog(parameters));
            } catch (error) {
                reject(error);
            }
        });
    }

    async insertLog(parameters) {
        let insertData = new Object();
        let body = parameters.body;
        let id = uuidv4();
        insertData["_id"] = id;
        insertData["userId"] = parameters.userData.uid;

        if (!("tags" in body)) {
            return ResponseStatus.REQUIRED_PARAMETER_MISSING("tags");
        }
        if (!("title" in body)) {
            return ResponseStatus.REQUIRED_PARAMETER_MISSING("title");
        }
        if (!("problemDesc" in body)) {
            return ResponseStatus.REQUIRED_PARAMETER_MISSING("problemDesc");
        }
        if (!("solution" in body)) {
            return ResponseStatus.REQUIRED_PARAMETER_MISSING("solution");
        }
        let tags = body.tags;
        let title = body.title;
        let problemDesc = body.problemDesc;
        let solution = body.solution;
        if (Utility.isStringEmptyOrUndefined(tags)) {
            return ResponseStatus.INVALID_PARAMETER("Tags cannot be empty");
        }
        if (Utility.isStringEmptyOrUndefined(title)) {
            return ResponseStatus.INVALID_PARAMETER("Title cannot be empty");
        }
        if (Utility.isStringEmptyOrUndefined(problemDesc)) {
            return ResponseStatus.INVALID_PARAMETER("Problem description cannot be empty");
        }
        if (Utility.isStringEmptyOrUndefined(solution)) {
            return ResponseStatus.INVALID_PARAMETER("Solution cannot be empty");
        }

        insertData["tags"] = tags.split(",");
        insertData["title"] = title;
        insertData["problemDesc"] = problemDesc;
        insertData["solution"] = solution;
        insertData["views"] = 0;
        insertData["likes"] = 0;
        insertData["dislikes"] = 0;
        insertData["ct"] = moment().valueOf();
        insertData["lu"] = moment().valueOf();

        let mongoDBUtility = new MongoDBUtility();

        let existingUser = await mongoDBUtility.getDataById("user", parameters.userData.uid);
        if (existingUser.logLimit === 0) {
            return ResponseStatus.FORBIDDEN("Log limit exhausted");
        }

        let insertResult = await mongoDBUtility.insertData("log", insertData);
        let response = new Object();
        response["message"] = "Successfully added data";
        response["id"] = id;
        response["result"] = insertResult.result;

        parameters.query["action"] = "decrementLogLimit";
        new PutUser().updateUser(parameters)
            .catch((error) => {
                Logger.error(error);
            });

        return ResponseStatus.CREATED(response);
    }
}

module.exports = PostLog;
