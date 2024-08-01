import * as userRepository from "./users.repository.js"

export const getAllUsers = () => {
	return userRepository.findAll()
}

export const getUserById = (id) => {
	return userRepository.findById(id)
}
export const create = (user) => {
	return userRepository.create(user)
}
export const update = async (userId, userData) => {
	const user = await userRepository.findById(userId)
	return userRepository.update(user.id, userData)
}
export const remove = (userId) => {
	return userRepository.remove(userId)
}
