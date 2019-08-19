const jwt = require('jsonwebtoken');
const jwtConfig = require('./config');
const MongoDBUtility = require('./../../mongodb/MongoDBUtility');

class UserAuthenticator {
    // instance = new UserAuthenticator();

    constructor() {
        this.instance = null;
    }

    static authenticateToken(token) {
        let decoded = jwt.verify(token, jwtConfig.jwtKey, { algorithm: 'HS256' });
        console.log("Decoded token : " + JSON.stringify(decoded, null, 2));
        return decoded;
    }

    static async isUserAdmin(userId) {
        const mongoDBUtility = new MongoDBUtility();
        try {
            let roles = await mongoDBUtility.getDataById("user", userId, "roles");
            roles = roles.roles;
            return (roles.includes("admin") || roles.includes("super-admin"));
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    static isUserSuperAdmin(userId) {
        const mongoDBUtility = new MongoDBUtility();
        try {
            let roles = mongoDBUtility.getDataById("user", userId, "roles");
            roles = roles.roles;
            return roles.includes("super-admin");
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

module.exports = UserAuthenticator;