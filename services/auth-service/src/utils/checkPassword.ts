import bcrypt from 'bcrypt'

//function for check password
export const comparePassword = async (plainText : string , hashedPassword : string) : Promise<boolean> => {

    if(hashedPassword && plainText){

        const isCorrect = await bcrypt.compare(plainText , hashedPassword)
        return isCorrect

    }

    return false

}