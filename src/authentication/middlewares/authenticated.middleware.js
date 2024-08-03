import jsonwebtoken from "jsonwebtoken"

import { webTokenSecretKey } from "./../../../config.js"

import { NotAuthorizedError } from "./../../errors/models/not-authorized-error.model.js"

export const authenticated = (req, res, next) => {
	try {
		//=====with token passed from body
		// const { token } = req.body

		//=====with cookie
		// const token = req.cookies.token

		//=====with session
		const token = req.session.token

		jsonwebtoken.verify(token, webTokenSecretKey)
		return next()
	} catch (error) {
		next(new NotAuthorizedError())
	}
}
