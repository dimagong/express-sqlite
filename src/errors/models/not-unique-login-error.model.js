const ERROR_MESSAGE_LOGIN_ERROR = "The login entered is not unique"

export class NotUniqueLoginError extends Error {
	constructor() {
		super(ERROR_MESSAGE_LOGIN_ERROR)

		this.customMessage = ERROR_MESSAGE_LOGIN_ERROR
		this.statusCode = 400
	}
}
