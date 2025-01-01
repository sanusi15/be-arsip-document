const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const connectDb = require('./config/db')
// dot env configuration
dotenv.config()

// DB Connection
connectDb()

// port configuration
const PORT = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// route
app.use('/api/v1/auth', require('./routes/authRoute'))
app.use('/api/v1/user', require('./routes/userRoute'))
app.use('/api/v1/file', require('./routes/fileRoute'))
app.use('/api/v1/folder', require('./routes/folderRoute'))

app.use('/api/v1/main', require('./routes/mainRoute'))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
