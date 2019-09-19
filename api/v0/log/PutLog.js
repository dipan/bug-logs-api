const MongoDBUtility = require('../../../mongodb/MongoDBUtility');
const ResponseStatus = require('../../ResponseStatus');
const Utility = require('../../../utility/Utility');

class PutLog {
    execute(parameters) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.updateLog(parameters));
            } catch (error) {
                reject(error);
            }
        });
    }

    async updateLog(parameters) {
        let collection = "log";
        let logId = parameters.param.id;
        let body = parameters.body;

        let mongoDBUtility = new MongoDBUtility();
        let existingLog = await mongoDBUtility.getDataById(collection, logId);

        let updateData = new Object();

        let updateResult = await mongoDBUtility.updateData(collection, logId, updateData);
        if (updateResult.matchedCount === 0) {
            return ResponseStatus.OBJECT_NOT_FOUND(collection);
        }
        else {
            delete updateResult["connection"];
            return ResponseStatus.OK(updateResult);
        }
    }

    async incrementViewCount(parameters) {
        let collection = "log";
        let logId = parameters.params.id;
        if (Utility.isStringEmptyOrUndefined(logId)) {
            return ResponseStatus.REQUIRED_PARAMETER_MISSING("logId");
        }

        let mongoDBUtility = new MongoDBUtility();
        let existingLog = await mongoDBUtility.getDataById(collection, logId);

        let updateData = new Object();
        updateData["views"] = existingLog.views + 1;

        let updateResult = await mongoDBUtility.updateData(collection, logId, updateData);
        if (updateResult.matchedCount === 0) {
            return ResponseStatus.OBJECT_NOT_FOUND(collection);
        }
        else {
            delete updateResult["connection"];
            return ResponseStatus.OK(updateResult);
        }
    }
}

module.exports = PutLog;
