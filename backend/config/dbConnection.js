import mongoose from 'mongoose'


const connectDB = async () => {
    try{
        const conn = await mongoose.connect('mongodb://localhost:27017',{
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })

        console.log(`mongoDB connected: ${conn.connection.host}`.cyan.underline)

    } catch (error){
        console.log(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

mongoose.set('strictQuery', false);

export default connectDB
