import sqlite3 from "sqlite3"
import path from "path"
import { existsSync } from "fs"

const dbPath = path.resolve("test-db.db")
const alreadyExist = existsSync(dbPath)

export const db = new sqlite3.Database(dbPath, (er) => {
	if (er) {
		console.log("Error connecting to database", er.message)
	} else {
		console.log("Connected to database")
	}
	if (!alreadyExist) {
		initDb()
	}
})

export const initDb = () => {
	db.run(
		"CREATE TABLE users (id INTEGER PRIMARY KEY, login TEXT, role TEXT, password TEXT UNIQUE);",
		(error) => {
			if (error) {
				console.log("Error innit DB", error)
				return
			}
			console.log("DB test data was successfully initialized ")
		}
	)
}
