import { Sequelize } from "sequelize"

//sequelize config
export const sequelize = new Sequelize({
    dialect : "postgres",
    username : Bun.env.DATABASE_USER,
    host : Bun.env.DATABASE_HOST,
    port : Number(Bun.env.DATABASE_PORT),
    password : Bun.env.DATABASE_PASSWORD,
    logging : false
})
 
//function for connecting database
export const connectDatabase = async () => {

    try {

        
        await Promise.all([
            sequelize.authenticate(),
            sequelize.sync({alter : true}) 
        ])
        console.log(`Postgres is connected`)

    } catch (error) {
        console.log(`Postgres is not connected error : ${error}`)
    }

}