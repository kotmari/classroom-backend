import express from 'express'
import subjectRouter from './db/routes/subjects'
import cors from 'cors'

const app = express()
const PORT = 8000

app.use(cors({
   origin: process.env.FRONTEND_URL,
   methods: ['GET', 'POST', 'PUT', 'DELETE'],
   credentials: true
}))

app.use(express.json())

app.use('/api/subjects', subjectRouter)

app.get('/', (req, res) => {
   res.send('Hello')
})

app.listen(PORT, ()=> {
   console.log(`server is running at http://localhost:${PORT}`)
})
