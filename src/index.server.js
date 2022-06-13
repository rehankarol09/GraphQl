const express = require('express');
const app = express()
const {graphqlHTTP} = require('express-graphql')
const schema = require("./schema/schema")
const connectDB =require('./config/db')

require('dotenv').config()

const Port= process.env.PORT || 5000

connectDB()
app.use('/graphql',graphqlHTTP({
    schema:schema,
    graphiql:process.env.NODE_ENV === 'development'
}))

app.listen(Port,()=>{(
console.log(`Server started on ${Port}`)
)})