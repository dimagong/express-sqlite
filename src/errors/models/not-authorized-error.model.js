const ERROR_MESSAGE = "Ypu do not have required permission for access this resource"

export class NotAuthorizedError extends Error {
	constructor() {
		super(ERROR_MESSAGE)

		this.customMessage = ERROR_MESSAGE
		this.statusCode = 403
	}
}
