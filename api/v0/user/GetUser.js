const MongoDBUtility = require('./../../../mongodb/MongoDBUtility');
const ResponseStatus = require('./../../ResponseStatus');

class GetUser {
    execute(parameters) {
        return new Promise(async (resolve, reject) => {
            try {
                let mongoDBUtility = new MongoDBUtility();
                let id = parameters.params.userId;
                let query = parameters.query;
                let projection = query.projection;

                let getResult = await mongoDBUtility.getDataById("user", id, projection);

                if (getResult === null) {
                    resolve(ResponseStatus.OBJECT_NOT_FOUND("user"));
                } else {
                    resolve(ResponseStatus.OK(getResult));
                }
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = GetUser;
