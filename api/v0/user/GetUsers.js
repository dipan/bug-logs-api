const MongoDBUtility = require('./../../../mongodb/MongoDBUtility');
const ResponseStatus = require('./../../ResponseStatus');

class GetUser {
    execute(parameters, context) {
        console.log("parameters.headers = " + JSON.stringify(parameters.headers, null, 2));
        console.log(parameters.params);
        console.log(parameters.query);
        console.log(parameters.body);

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
