import * as userRepository from "./users.repository.js"
import { BedRequestError } from "./../errors/models/bed-request-error.model.js"

export const getAllUsers = () => {
	return userRepository.findAll()
}

export const getUserById = (id) => {
	return userRepository.findById(id)
}

export const getUserByLogin = async (login) => {
	try {
		const existUser = await userRepository.findByLogin(login)
		return existUser
	} catch (error) {
		return null
	}
}

export const create = async (user) => {
	const possibleUser = await getUserByLogin(user.login)

	if (possibleUser) {
		throw new BedRequestError("The specified login is already exist")
	}
	return userRepository.create(user)
}

export const update = async (userId, userData) => {
	const user = await userRepository.findById(userId)
	return userRepository.update(user.id, userData)
}
export const remove = (userId) => {
	return userRepository.remove(userId)
}
