class ExpressError extends Error{
    constructor(ststusCode, message) {
        super();
        this.statusCode = ststusCode;
        this.message = message;
    }
}

module.exports = ExpressError;