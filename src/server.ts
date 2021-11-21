import express from 'express'

import { json } from 'body-parser'

import { ConversationFactory } from './factories/ConversationFactory'

const server = express()

server.use(json())
server.use(express.static('./src/public'))


server.post('/test', (request, response) => {
  const conversationProcessorFactory = new ConversationFactory()

  const processor = conversationProcessorFactory.getConversationProcessor(request.body.frequency)
  const data = processor.matchTriggers(request.body)
  return response.json({ message: data.message, confidence: data.confidence, name: data.name })
})

server.listen(8080, () => console.log('running'))
