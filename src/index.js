import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"
import allowanceRequestRoutes from './routes/allowanceRequestRoute.js'
import cors from 'cors'

dotenv.config()

const app = express();

connectDB()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8001



app.get("/", (req,res) => {
    res.send("API is running.....")
})


app.use('/api/users', userRoutes);
app.use('/api/requests', allowanceRequestRoutes);


app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`)
})