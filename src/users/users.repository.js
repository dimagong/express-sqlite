import { db } from "../../db.js"
import { NotFoundError } from "./../errors/models/not-fount-error.model.js"
import { NotUniqueLoginError } from "./../errors/models/not-unique-login-error.model.js"

export const findAll = () => {
	return new Promise((resolve, reject) => {
		db.all("SELECT * FROM users", (err, rows) => {
			if (err) {
				reject(err.message)
				return
			}
			resolve(rows)
		})
	})
}

export const findById = (id) => {
	return new Promise((resolve, reject) => {
		db.get(`SELECT * FROM users WHERE id =${id}`, (err, row) => {
			if (err) {
				reject(err.message)
				return
			}

			if (!row) {
				// reject("User is not found")
				reject(new NotFoundError("User is not found"))
			}

			resolve(row)
		})
	})
}

export const findByLogin = (login) => {
	return new Promise((resolve, reject) => {
		//limited_user
		db.get(`SELECT * FROM users WHERE login ="${login}"`, (err, row) => {
			if (err) {
				reject(err.message)
				return
			}

			if (!row) {
				// reject("User is not found")
				reject(new NotFoundError("User is not found"))
			}

			resolve(row)
		})
	})
}

export const create = (user) => {
	return new Promise((resolve, reject) => {
		db.run(
			"INSERT INTO users (login,role,password) VALUES(?,?,?)",
			[user.login, user.role, user.password],
			(err) => {
				if (err) {
					reject(err.message)
					return
				}
				resolve("User was created")
			}
		)
	})
}

export const update = (id, user) => {
	return new Promise((resolve, reject) => {
		db.run("UPDATE users SET role=? WHERE id=?", [user.role, id], (err) => {
			if (err) {
				reject(err.message)
				return
			}
			resolve("User was updated")
		})
	})
}

export const remove = (id) => {
	return new Promise((resolve, reject) => {
		db.run("DELETE FROM users WHERE id=?", [id], (err) => {
			if (err) {
				reject(err.message)
				return
			}
			resolve("User was deleted")
		})
	})
}
