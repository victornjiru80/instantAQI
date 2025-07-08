import express from 'express'
import connectDB from './libs/dbconnect.js'
import 'dotenv/config'
import cors from 'cors'
import router from './routes/route.js'
import cookieParser from 'cookie-parser'

const app = express()
connectDB()

const allowedOrigins = [
  'http://localhost:5173',
  'https://instant-aqi-client.vercel.app',
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow localhost, production, and all Vercel preview URLs
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      (origin && origin.endsWith('.vercel.app'))
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json())
app.use(cookieParser())
app.use('/api', router)

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})