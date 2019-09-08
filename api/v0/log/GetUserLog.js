const MongoDBUtility = require('./../../../mongodb/MongoDBUtility');
const ResponseStatus = require('./../../ResponseStatus');
const Utility = require('../../../utility/Utility');

class GetUserLog {
    execute(parameters) {
        return new Promise(async (resolve, reject) => {
            try {
                let collection = "log";
                let mongoDBUtility = new MongoDBUtility();
                let uid = parameters.userData.uid;
                let query = parameters.query;
                let projection = query.projection;
                let filter = "userId eq '" + uid + "'";
                if (Utility.isStringNonEmpty(query.filter)) {
                    filter += " " + query.filter;
                }

                let getResult = await mongoDBUtility.getData(collection, filter);

                if (getResult === null) {
                    resolve(ResponseStatus.NO_DATA_AVAILABLE());
                } else {
                    resolve(ResponseStatus.OK(getResult));
                }
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = GetUserLog;
