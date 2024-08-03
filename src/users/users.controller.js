import * as usersService from "./user.service.js"

// const USERS = [
// 	{
// 		login: "user-admin",
// 		role: "admin",
// 	},
// ]

export const findAll = async (req, res, next) => {
	// return res.json(USERS)
	try {
		const users = await usersService.getAllUsers()
		return res.json(users)
	} catch (error) {
		//return res.status(500).send(error)
		return next(error)
	}
}

export const findById = async (req, res, next) => {
	const userId = req.params.id

	try {
		const user = await usersService.getUserById(userId)
		return res.json(user)
	} catch (error) {
		// return res.status(500).send(error)
		return next(error)
	}

	// const user = USERS.find((user) => user.login === login)

	// if (!user) {
	// 	return res.status(404).json({
	// 		message: "user is not found",
	// 	})
	// }
	// return res.json(user)
}

export const findByLogin = async (req, res, next) => {
	const userLogin = req.params.login

	console.log("findByLogin====userLogin", userLogin)
	try {
		const user = await usersService.getUserByLogin(userLogin)
		return res.json(user)
	} catch (error) {
		// return res.status(500).send(error)
		return next(error)
	}
}

export const create = async (req, res, next) => {
	const userBody = req.body
	try {
		const user = await usersService.create(userBody)
		return res.json(user)
	} catch (error) {
		// return res.status(500).send(error)
		return next(error)
	}

	// USERS.push({
	// 	login: userBody.login,
	// 	role: userBody.role,
	// })
	// return res.json(USERS[USERS.length - 1])
}

export const update = async (req, res, next) => {
	const userId = req.params.id
	const userBody = req.body
	try {
		const user = await usersService.update(userId, userBody)
		return res.json(user)
	} catch (error) {
		// return res.status(500).send(error)
		return next(error)
	}

	// const userId = USERS.findIndex((user) => user.login === login)
	// if (!~userId) {
	// 	return res.status(404).json({
	// 		message: "user is not found",
	// 	})
	// }

	// const userBody = req.body
	// USERS[userId] = {
	// 	...USERS[userId],
	// 	role: userBody.role,
	// }
	// return res.json(USERS[userId])
}

export const remove = async (req, res, next) => {
	const userId = req.params.id

	try {
		const user = await usersService.remove(userId)
		return res.json(user)
	} catch (error) {
		// return res.status(500).send(error)
		return next(error)
	}
	// const login = req.params.login

	// const userId = USERS.findIndex((user) => user.login === login)

	// if (!~userId) {
	// 	return res.status(404).json({
	// 		message: "user is not found",
	// 	})
	// }

	// USERS.splice(userId, 1)

	// return res.status(200)
}
