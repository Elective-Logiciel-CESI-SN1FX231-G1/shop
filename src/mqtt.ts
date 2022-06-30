import mqtt from 'async-mqtt'
import config from 'config'
import { processSponsor } from './controllers/CouponController'
import { processAccountDelete, processAccountUpdate } from './controllers/RestaurantController'

const client = mqtt.connect(config.get('mqtt.url'))

client.on('message', async function (topic, message) {
  try {
    const msg = JSON.parse(message.toString())
    if (topic === 'sponsor/sponsorship/restaurateur') await processSponsor(msg)
    if (topic === 'sponsor/sponsorship/client') await processSponsor(msg)
    if (topic === 'auth/users/edit') await processAccountUpdate(msg)
    if (topic === 'auth/users/delete') await processAccountDelete(msg)
  } catch (error) {
    console.error(error)
  }
})

export const connect = async function () {
  if (!client.connected) { await new Promise(resolve => client.once('connect', resolve)) }
  await client.subscribe('sponsor/sponsorship/restaurateur')
  await client.subscribe('sponsor/sponsorship/client')
  await client.subscribe('auth/users/edit')
  await client.subscribe('auth/users/delete')
}

export default client
