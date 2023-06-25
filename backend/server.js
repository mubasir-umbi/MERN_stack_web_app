const express = require ('express');
const notes = require('./data/notes')
const env = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin')
const cors = require('cors');
const { notFound, errorHandler } = require('./middlewares/error');

const app = express()
env.config()
connectDB()
app.use(express.json())

// app.get('/', (req, res) => {
//     res.send('Api is running..')
// })



app.use('/api/users', userRoutes)
app.use('/api/admin', adminRoutes)

app.use(notFound)
app.use(errorHandler)
app.use(cors());

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`server started on ${PORT}`));