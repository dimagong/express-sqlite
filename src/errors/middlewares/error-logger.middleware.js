export const errorLogger = (error, req, res, next) => {
	console.log("ERROR STACK====", error.statusCode || 500, error.stack)
	return next(error)
}
