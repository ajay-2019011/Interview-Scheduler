const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const candidates = require('./path/candidate-routes')
const interview = require('./path/interview-routes')
const {connect} = require('./database/dbservice/dbservice.js')
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/interview',interview)
app.use('/candidates', candidates)

const PORT = process.env.PORT || 3001

app.listen(PORT, async()=>console.log(`Server started on PORT ${PORT}`));