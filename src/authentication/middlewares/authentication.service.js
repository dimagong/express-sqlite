import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"

import * as userService from "./../../users/user.service.js"

import { webTokenSecretKey } from "./../../../config.js"

import { AuthError } from "./../../errors/models/auth-error.model.js"
import { NotUniqueLoginError } from "./../../errors/models/not-unique-login-error.model.js"

const EXPIRES_IN = "1d"

const generateAuthToken = (payload) => {
	return jsonwebtoken.sign(payload, webTokenSecretKey, { expiresIn: EXPIRES_IN })
}

const createPasswordHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync())

const compareHashWithPassword = (password, passwordHash) =>
	bcrypt.compareSync(password, passwordHash)

export const registerNewUser = async (login, password) => {
	const possibleUser = await userService.getUserByLogin(login)

	if (possibleUser) {
		throw new NotUniqueLoginError()
	}

	const passwordHash = createPasswordHash(password)

	const newUser = await userService.create({
		login: login,
		role: "limited_user",
		password: passwordHash,
	})

	return newUser
}

export const authenticateUser = async (userName, password) => {
	const user = await userService.getUserByLogin(userName)

	if (!user) {
		throw new AuthError()
	}

	const isPasswordCorrect = compareHashWithPassword(password, user.password)

	if (!isPasswordCorrect) {
		throw new AuthError()
	}
	const token = generateAuthToken({ id: user.id })

	return token
}
