import jsonwebtoken from "jsonwebtoken"

import { webTokenSecretKey } from "./../../../config.js"

import { NotAuthorizedError } from "./../../errors/models/not-authorized-error.model.js"

export const authenticated = (req, res, next) => {
	try {
		const { token } = req.body
		jsonwebtoken.verify(token, webTokenSecretKey)
		return next()
	} catch (error) {
		next(new NotAuthorizedError())
	}
}
