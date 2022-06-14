import type { Server } from 'http'
import mongoose from 'mongoose'
import config from 'config'
import app from './app'

let server: Server

export default {
  start: async () => {
    await mongoose.connect(config.get('mongo.url'))
    server = app.listen(config.get('http.port'))
    await new Promise(resolve => server.once('listening', resolve))
    console.log(`Http server listening on: ${config.get('http.publicUrl')}`)
  },
  stop: async () => {
    server.close()
    await new Promise(resolve => server.once('close', resolve))
    await mongoose.disconnect()
  }
}
