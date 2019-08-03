const MongoDBUtility = require('./../../../mongodb/MongoDBUtility');
const ResponseStatus = require('./../../ResponseStatus');

class GetUser {
    execute(parameters) {
        console.log(parameters.userData);

        return new Promise(async (resolve, reject) => {
            try {
                let mongoDBUtility = new MongoDBUtility();
                let getResult = await mongoDBUtility.getData("user");

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

module.exports = GetUser;
