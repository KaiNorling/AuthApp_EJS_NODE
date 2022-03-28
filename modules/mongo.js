const {MongoClient} = require("mongodb")
const mongoUrl ="mongodb://localhost:27017"


const client = new MongoClient (mongoUrl)

async function mongo (){
    try {
        await client.connect()
        console.log(`Server Connectet to monogoDB ${mongoUrl}`);
        const db=await client.db("indeed")
        const users= await db.collection("users")
        const bots= await db.collection("bots")
        // await users.insertOne({name:"JO Bllack"})

        return {
            users,bots
        }

        
    } catch (error) {
        console.log(error);
    }
}

module.exports=mongo;