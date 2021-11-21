import express from 'express'

import { json } from 'body-parser'

import { Payload } from './types/Payload'
import { ProcessorResult } from './types/ProcessorResult'
import { ConversationFactory } from './factories/ConversationFactory'

const server = express()

server.use(json())
server.use(express.static('./src/public'))

const conversationProcessorFactory = new ConversationFactory()

const check = (payload: Payload): ProcessorResult => {
  const processor = conversationProcessorFactory.getConversationProcessor(payload.frequency)
  return processor.matchTriggers(payload)
}

server.post('/test', (request, response) => {
  const data = check(request.body as Payload)
  return response.json({ message: data.message, confidence: data.confidence, name: data.name })
})
server.listen(8080, () => console.log('running'))
