import {Request , Response , NextFunction} from 'express'
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import lodash from 'lodash'

//function for checking authentication
export const authMiddleware = async (request : Request , response : Response , next : NextFunction) => {

    try {
        const {authToken : token} = request.cookies as {authToken : string} || {}

        if(!token){
            response.status(400).json({success : false , error : "Unautherized user"})
            return
        }
 
        const secret = process.env.JWT_SECRET as string
        const decode = await jwt.verify(token , secret)

        if(!decode){

            response.status(400).json({success : false , error : "Invalid token"})
            return

        }

        lodash.merge(request , {userDetails : decode})
        return next()

    } catch (error) {
        console.log(`authMiddleware error : ${error}`)
    }

}