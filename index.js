const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const compression = require('compression')
const connectDB = require('./config/db')
const bodyParser = require('body-parser')

const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

// connect to db
connectDB()

// load env
dotenv.config({ path: './config/.env' })
const port = process.env.PORT

app.use(cors({ origin: 'http://localhost:3000' }))

// routes
const userRoute = require('./routes/user')

// mount
app.use('/api/users', userRoute)

app.use(compression())

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
