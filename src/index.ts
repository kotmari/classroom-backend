import express from 'express'
import subjectRouter from './db/routes/subjects'
import userRouter from './db/routes/users'
import classesRouter from './db/routes/classes'
import cors from 'cors'
import securityMiddleware from './middleware/security'
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

const app = express()
const PORT = 8000

if(!process.env.FRONTEND_URL) throw new Error('FRONTEND_URL is not set in .env file');

app.use(cors({
   origin: process.env.FRONTEND_URL,
   methods: ['GET', 'POST', 'PUT', 'DELETE'],
   credentials: true
}))

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json())
// app.use(securityMiddleware)

app.use('/api/subjects', subjectRouter)
app.use('/api/users', userRouter)
app.use('/api/classes', classesRouter)

app.get('/', (req, res) => {
   res.send('Hello')
})

app.listen(PORT, ()=> {
   console.log(`server is running at http://localhost:${PORT}`)
})
