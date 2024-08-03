import express from "express"
import * as userController from "./src/users/users.controller.js"

import { standardErrorResponser } from "./src/errors/middlewares/standard-error-responser.middleware.js"
import { errorLogger } from "./src/errors/middlewares/error-logger.middleware.js"
import { authenticated } from "./src/authentication/middlewares/authenticated.middleware.js"
import * as authenticationController from "./src/authentication/middlewares/authentication.controller.js"
import { hasRole } from "./src/authorization/middlewares/has-role.middleware.js"

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

// app.get(
// 	"/user/me",
// 	authenticated,
// 	hasRole("limited_user"),
// 	addCurrentUserIdToParams,
// 	userController.findById
// )
app.get("/users", authenticated, hasRole("admin"), userController.findAll)
// app.get("/users", userController.findAll)
app.get("/users/:id", authenticated, hasRole("admin"), userController.findById)
app.get("/users/login/:login", userController.findByLogin)
//app.post("/users", authenticated, hasRole("admin"), userController.create)
app.post("/users", userController.create)
app.put("/users/:id", authenticated, hasRole("admin"), userController.update)
app.delete("/users/:id", authenticated, hasRole("admin"), userController.remove)

app.use(errorLogger)
app.use(standardErrorResponser)

app.listen(PORT, () => console.log("Server successfully started on port ===== ", PORT))
