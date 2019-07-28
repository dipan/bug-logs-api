class ResponseStatus {
    static OK(response) {
        return {
            message: response,
            statusCode: 200
        }
    }

    static CREATED(response) {
        return {
            message: response,
            statusCode: 201
        }
    }

    static NO_AUTHENTICATION_TOKE() {
        return {
            message: {
                developerMessage: "No authentication token provided",
                userMessage: "No authentication token provided"
            },
            statusCode: 401
        }
    }

    static INVALID_AUTHENTICATION_TOKE() {
        return {
            message: {
                developerMessage: "Invalid authentication token",
                userMessage: "Invalid authentication token"
            },
            statusCode: 401
        }
    }

    static INTERNAL_SERVER_ERROR(internalError) {
        return {
            message: {
                developerMessage: "Internal server error occurred",
                userMessage: "Internal server error occurred",
                error: internalError
            },
            statusCode: 500
        }
    }
}

module.exports = ResponseStatus;
