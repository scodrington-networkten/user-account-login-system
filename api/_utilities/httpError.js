export class HttpError extends Error {
    constructor(message, status = 500) {
        super(message);
        this.name = "HttpError";
        this.status = status;
    }

    toJSON() {
        return {
            error: this.name,
            message: this.message,
            status: this.status
        }
    }
}
