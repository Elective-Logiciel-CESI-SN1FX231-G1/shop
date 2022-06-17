import mqtt from 'async-mqtt'
import config from 'config'
import { processSponsorRestaurateur } from './controllers/CouponController'

const client = mqtt.connect(config.get('mqtt.url'))

client.on('message', async function (topic, message) {
  try {
    const msg = JSON.parse(message.toString())
    if (topic === 'sponsor/sponsorship/restaurateur') await processSponsorRestaurateur(msg)
  } catch (error) {
    console.error(error)
  }
})

export const connect = async function () {
  if (!client.connected) { await new Promise(resolve => client.once('connect', resolve)) }
  await client.subscribe('sponsor/sponsorship/restaurateur')
}

export default client
