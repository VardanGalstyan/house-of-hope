import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'
import mongoose from 'mongoose'
import projectRouter from './src/services/projects/index.js'
import articleRouter from './src/services/news/index.js'
import teamRouter from './src/services/team/index.js'
import partnerRouter from './src/services/partners/index.js'
import adminRouter from './src/services/admin/index.js'

const server = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use(cors())
server.use(express.json())
server.use(express.static('./client/build'))


// R O U T E S   H E R E 

server.use('/projects', projectRouter)
server.use('/articles', articleRouter)
server.use('/teams', teamRouter)
server.use('/partners', partnerRouter)
server.use('/admin', adminRouter)

server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build', 'index.html'))
}
)


// M I D D L E W A R E   H E R E
const PORT = process.env.PORT || 5000


// D A T A B A S E   H E R E

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB')
    server.listen(PORT, () => {
        console.table(listEndpoints(server))
        console.log(`Server listening on port ${PORT}`)
    })
})

mongoose.connection.on('error', (err) => {
    console.log(`Error connecting to MongoDB: ${err}`)
})


