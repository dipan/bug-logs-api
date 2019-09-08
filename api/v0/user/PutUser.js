const MongoDBUtility = require('../../../mongodb/MongoDBUtility');
const ResponseStatus = require('../../ResponseStatus');
const Utility = require('../../../utility/Utility');

class PutUser {
    execute(parameters) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.updateUser(parameters));
            } catch (error) {
                reject(error);
            }
        });
    }

    async updateUser(parameters) {
        let collection = "user";
        let uid = parameters.userData.uid;
        let action = parameters.query.action;
        let count = parameters.query.count;
        // let body = parameters.body;

        if (Utility.isStringEmptyOrUndefined(count)) {
            count = 1;
        }
        if (Utility.isStringEmptyOrUndefined(action)) {
            return ResponseStatus.REQUIRED_PARAMETER_MISSING("action");
        }

        let mongoDBUtility = new MongoDBUtility();
        let existingUser = await mongoDBUtility.getDataById(collection, uid);
        if (action === "incrementLogLimit") {
            count = existingUser.logLimit + count;
        }
        else if (action === "decrementLogLimit") {
            count = existingUser.logLimit - count;
        }
        else if (action === "setLogLimit") {
            // count=existingUser.logLimit - count;
        }

        let insertData = new Object();
        insertData["logLimit"] = count;
        let updateResult = await mongoDBUtility.updateData(collection, uid, insertData);
        if (updateResult.matchedCount === 0) {
            return ResponseStatus.OBJECT_NOT_FOUND(collection);
        }
        else {
            delete updateResult["connection"];
            return ResponseStatus.OK(updateResult);
        }
    }
}

module.exports = PutUser;
