const MongoDBUtility = require('./../../../mongodb/MongoDBUtility');
const ResponseStatus = require('./../../ResponseStatus');
const UserAuthenticator = require('./../../auth/UserAuthenticator');

class GetUsers {
    execute(parameters) {
        console.log(parameters.userData);

        return new Promise(async (resolve, reject) => {
            try {
                if(!await UserAuthenticator.isUserAdmin(parameters.userData.uid)){
                    resolve(ResponseStatus.FORBIDDEN("Only admins are allowed to access this resource"));
                    return;
                }

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

module.exports = GetUsers;
