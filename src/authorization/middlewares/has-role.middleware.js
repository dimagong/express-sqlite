import jsonwebtoken from "jsonwebtoken"

import * as userService from "./../../users/user.service.js"

import { webTokenSecretKey } from "./../../../config.js"

import { rolePermissions } from "./../authorization.service.js"

import { NotAuthorizedError } from "./../../errors/models/not-authorized-error.model.js"

import { getRoleByUserId } from "./../../users/user.service.js"

export const hasRole = (requiredRole) => {
	const requiredRolePermission = rolePermissions[requiredRole] || 0

	return async (req, res, next) => {
		try {
			//=====with token passed from body
			// const { token } = req.body

			//=====with cookie
			// const token = req.cookies.token
			// const decoded = jsonwebtoken.verify(token, webTokenSecretKey)
			// const userRole = await getRoleByUserId(decoded.id)

			//=====with session
			const userRole = req.session.role

			const userPermissionLevel = rolePermissions[userRole] || 0

			if (userPermissionLevel < requiredRolePermission) {
				throw new NotAuthorizedError()
			}
			return next()
		} catch (error) {
			next(error)
		}
	}
}
