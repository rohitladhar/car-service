const express = require('express')
const app = express()
const connectDB = require('./db')
const routes = require('./routes/carservice')
const cors = require('cors')

app.use(cors())
const PORT = process.env.PORT || 9000


connectDB()
app.use(express.json())
app.use('/api', routes)

app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`)
})


