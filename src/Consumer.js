require('dotenv').config()
const amqp = require('amqplib')
const OpenMusicServices = require('./OpenMusicServices')
const MailSender = require('./MailSender')
const Listener = require('./Listener')

const init = async () => {
  const openMusicServices = new OpenMusicServices()
  const mailSender = new MailSender()
  const listener = new Listener(openMusicServices, mailSender)

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER)
  const channel = await connection.createChannel()

  await channel.assertQueue('export:music', {
    durable: true
  })

  channel.consume('export:music', listener.listen, { noAck: true })
  console.log(`Consumer berjalan pada ${process.env.RABBITMQ_SERVER}`)
}
init()
