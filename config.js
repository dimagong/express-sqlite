import dotenv from "dotenv"

dotenv.config()

export const webTokenSecretKey = process.env.WEB_TOKEN_SECRET_KEY

export const publicPort = process.env.PUBLIC_PORT

export const sessionSecretKey = process.env.SESSION_SECRET_KEY
