const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 3000
const database = require('./services/database')

app.use(express.json());
app.use(cors());
app.use(require('./Routes/DepartmentRoutes.js'));


app.get('/', (req, res) => {
  res.send('I am your boss')
})

app.listen(port, () => {
  console.log(`Testing port is ${port}`)
})
