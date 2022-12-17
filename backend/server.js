import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import mongoose from 'mongoose'
import connectDB from './config/dbConnection.js'
import userRoutes from './routes/userRoutes.js' 

// import getContact from "./controllers/contactController.js"


dotenv.config()


connectDB()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/',userRoutes);


const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);




