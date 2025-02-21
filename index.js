import { initServer } from './configs/app.js'
import { config } from 'dotenv'
import { connect } from './configs/mongo.js'
import { alreadyExist } from './utils/default.models.js'

config()
connect()
initServer()
alreadyExist()