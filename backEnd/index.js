const connectToMongo = require('./db')
const express = require('express')
const app = express()
const port = 5000
connectToMongo();

app.use(express.json())

// Available routes(end points like app.get,app.post we have created seprate file for this work)
app.use('/api/auth',require('./routes/auth')); 
app.use('/api/notes',require('./routes/notes')); 

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})