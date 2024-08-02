import express from "express"
import { findAll, findById, create, remove, update } from "./src/users/users.controller.js"

import { standardErrorResponser } from "./src/errors/middlewares/standard-error-responser.middleware.js"
import { errorLogger } from "./src/errors/middlewares/error-logger.middleware.js"

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

app.get("/users", findAll)
app.get("/users/:id", findById)
app.post("/users", create)
app.put("/users/:id", update)
app.delete("/users/:id", remove)

app.use(errorLogger)
app.use(standardErrorResponser)

app.listen(PORT, () => console.log("Server successfully started on port ===== ", PORT))
