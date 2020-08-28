const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = require('./app')


dotenv.config({ path: './config.env' })

const port = process.env.PORT || 3000
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(con => {
    console.log('MongoDB is connected')
})


app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
