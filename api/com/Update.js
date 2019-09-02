const MongoDBUtility = require('../../mongodb/MongoDBUtility');
const ResponseStatus = require('../ResponseStatus');
const Utility=require('../../utility/Utility');

class Update {
    execute(parameters) {
        return new Promise(async (resolve, reject) => {
            try {
                let mongoDBUtility = new MongoDBUtility();
                let collection = parameters.params.collection;
                let action = parameters.query.action;
                let id = parameters.query.id;
                let body = parameters.body;

                if(Utility.isStringEmptyOrUndefined(action)){
                    resolve(ResponseStatus.REQUIRED_PARAMETER_MISSING("action"));
                    return;
                }

                let updateResult;
                if (action === "updateOne") {
                    updateResult = await mongoDBUtility.updateData(collection, id, body);
                } else if (action === "updateMany") {
                    updateResult = await mongoDBUtility.updateMany(collection, body);
                }

                if (updateResult.matchedCount === 0) {
                    resolve(ResponseStatus.OBJECT_NOT_FOUND(collection));
                } else {
                    resolve(ResponseStatus.OK(updateResult));
                }
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = Update;
