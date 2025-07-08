import express from 'express'
import connectDB from './libs/dbconnect.js'
import 'dotenv/config'
import cors from 'cors'
import router from './routes/route.js'
import cookieParser from 'cookie-parser'

const app = express()
connectDB()

const frontendUrl = process.env.CLIENT_URL

app.use(cors({
    origin: frontendUrl,
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use('/api', router)

app.get('/', (req, res) => {
    res.send('Hello World')
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})