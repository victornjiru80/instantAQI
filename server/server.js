import express from 'express'
import connectDB from './libs/dbconnect.js'
import 'dotenv/config'
import cors from 'cors'
import router from './routes/route.js'
import cookieParser from 'cookie-parser'

const app = express()
connectDB()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use('/api', router)

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})