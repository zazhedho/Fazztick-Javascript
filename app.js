require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const server = express()
const main = require('./src/main')
const db = require('./src/config/db')

const init = async () => {
  try {
    await db.connect()

    // Midleware
    server.use(bodyParser.urlencoded({ extended: false }))
    server.use(express.json())
    server.use('/images', express.static('images'))
    server.use('/api/v1', main)

    server.listen(process.env.APP_PORT, () => {
      console.log(`Server ready on port ${process.env.APP_PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}
init()
