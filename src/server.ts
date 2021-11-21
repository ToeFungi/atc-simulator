import express from 'express'

import { json } from 'body-parser'

import { Result } from './libs/Result'
import { Trigger } from './libs/Trigger'
import { Aircraft } from './libs/Aircraft'
import { CallSign } from './libs/CallSign'
import { Conversation } from './types/Conversation'

import apron from './resources/apron.json'

const server = express()

server.use(json())
server.use(express.static('./src/public'))

const check = (payload): Result => {
  const aircraft = new Aircraft(payload.aircraftType, payload.aircraftManufacturer)
  const callSign = new CallSign(payload.callSign, payload.shortenedCallSign)
  const triggers = apron.map((conversation: Conversation) => new Trigger(callSign, aircraft, conversation))

  const results: Result[] = triggers.map((trigger: Trigger) => trigger.detectTriggers(payload.transcript))
  const filteredResults = results.filter((result: Result) => !!result)
    .filter((result: Result) => result.confidence > 0)

  console.log({ filteredResults, results })
  if (!filteredResults.length) {
    return {
      confidence: 0,
      message: 'I did not understand'
    }
  }

  return filteredResults[0]
}

server.post('/test', (request, response) => {
  const data = check(request.body)
  return response.json({ message: data.message, confidence: data.confidence })
})
server.listen(8080, () => console.log('running'))
