const MongoDBUtility = require('./../../../mongodb/MongoDBUtility');
const ResponseStatus = require('./../../ResponseStatus');

class GetLogs {
    execute(parameters) {
        return new Promise(async (resolve, reject) => {
            try {
                let query = parameters.query;
                let projection = query.projection;
                let filter = query.filter;

                let mongoDBUtility = new MongoDBUtility();
                let getResult = await mongoDBUtility.getData("log", filter, projection);

                if (getResult.length === 0) {
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

module.exports = GetLogs;
