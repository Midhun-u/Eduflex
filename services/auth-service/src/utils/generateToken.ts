import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { Response } from 'express'

//function for generate token
export const generateToken = async (id: string, fullname: string, response: Response) => {

    const token = await jwt.sign({ id: id, fullname: fullname }, process.env.JWT_SECRET as string, { expiresIn: "30d" })
    response.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge : 30 * 24 * 60 * 60 * 1000
    })

}