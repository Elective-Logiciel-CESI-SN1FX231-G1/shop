import server from './server'

const startPromise = start()
process.once('SIGTERM', stop)

async function start () {
  try {
    console.log('Starting ...')
    await server.start()
    console.log('Server started')
  } catch (error) {
    console.error('Server failed to start', error)
    process.exit(1)
  }
}

async function stop () {
  console.log('Shuting down ...')
  try {
    await startPromise
    await server.stop()
    console.log('Shuting down now !')
    process.exit(0)
  } catch (error) {
    console.error('Error during shuting down :', error)
    process.exit(1)
  }
}
