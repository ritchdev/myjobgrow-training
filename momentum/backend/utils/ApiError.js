class ApiError extends Error{
    constructor(statusCode, message = "Something went wrong!", errors = [], stackTrace){
        super(message)
        this.statusCode = statusCode
        this.errors = errors
        this.data = null
        this.success = false
        this.stackTrace = stackTrace
    }
}

export default ApiError