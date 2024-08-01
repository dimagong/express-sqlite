import express from "express"
import { findAll, findById, create, remove, update } from "./src/users/users.controller.js"

const PORT = 3000

const app = express()

app.set("view engine", "ejs")

app.use("/media", express.static("public"))

app.use(express.json())

app.get("/", (req, res) => {
	res.render("pages/index", { data: "here is some data" })
})

app.listen(PORT, () => console.log("Server successfully started on port ===== ", PORT))

app.get("/users", findAll)
app.get("/users/:id", findById)
app.post("/users", create)
app.put("/users/:id", update)
app.delete("/users/:id", remove)
