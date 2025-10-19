import bcrypt from 'bcrypt'

export const hashPassowrd = async (password : string) : Promise<string | undefined> => {

    if(password.length > 0){

        const salt = await bcrypt.genSalt(10) //generating salt
        const hashedPassword = await bcrypt.hash(password , salt)
        return hashedPassword

    }

}