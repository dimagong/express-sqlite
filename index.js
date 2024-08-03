import express from "express"
import {
	findAll,
	findById,
	create,
	remove,
	update,
	findByLogin,
} from "./src/users/users.controller.js"

import { standardErrorResponser } from "./src/errors/middlewares/standard-error-responser.middleware.js"
import { errorLogger } from "./src/errors/middlewares/error-logger.middleware.js"

import * as authenticationController from "./src/authentication/middlewares/authentication.controller.js"

const PORT = 3000

const app = express()

app.set("view engine", "ejs")

app.use((req, res, next) => {
	console.log("REQUEST METHOD====", req.method)
	next()
})

app.use("/media", express.static("public"))

app.use(express.json())

app.get("/", (req, res) => {
	res.render("pages/index", { data: "here is some data" })
})

app.post("/signin", authenticationController.signIn)
app.post("/signup", authenticationController.signUp)

app.get("/users", findAll)
app.get("/users/:id", findById)
app.get("/users/login/:login", findByLogin)
app.post("/users", create)
app.put("/users/:id", update)
app.delete("/users/:id", remove)

app.use(errorLogger)
app.use(standardErrorResponser)

app.listen(PORT, () => console.log("Server successfully started on port ===== ", PORT))
