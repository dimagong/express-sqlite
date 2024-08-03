import * as authenticationService from "./authentication.service.js"

import { getRoleByUserLogin } from "./../../users/user.service.js"

export const signIn = async (req, res, next) => {
	try {
		const { login, password } = req.body
		const token = await authenticationService.authenticateUser(login, password)

		//=====with cookie
		// res.cookie("token", token, {
		// 	expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
		// 	httpOnly: true, // blocking access from client side
		// 	// secure: true  // only https
		// })

		//=====with session
		req.session.token = token
		req.session.role = await getRoleByUserLogin(login)

		//=====with token passed from body
		// return res.json({ token })
		return res.json({})
	} catch (error) {
		return next(error)
	}
}

export const signUp = async (req, res, next) => {
	try {
		const { login, password } = req.body
		const newUser = await authenticationService.registerNewUser(login, password)
		return res.json(newUser)
	} catch (error) {
		return next(error)
	}
}
