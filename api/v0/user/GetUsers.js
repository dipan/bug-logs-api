const MongoDBUtility = require('./../../../mongodb/MongoDBUtility');
const ResponseStatus = require('./../../ResponseStatus');

class GetUser {
    execute(parameters) {
        console.log(parameters.userData);

        return new Promise(async (resolve, reject) => {
            try {
                let mongoDBUtility = new MongoDBUtility();
                let getResult = await mongoDBUtility.getData("user");


                resolve(ResponseStatus.OK(getResult));
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = GetUser;
