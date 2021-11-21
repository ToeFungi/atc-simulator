import express from 'express'

import { json } from 'body-parser'

import { Trigger } from './libs/Trigger'
import { Aircraft } from './libs/Aircraft'
import { CallSign } from './libs/CallSign'

import apron from './resources/apron.json'

const server = express()

server.use(json())
server.use(express.static('./src/public'))

const aircraft = new Aircraft('tomahawk', 'piper')
const callSign = new CallSign('zspop', 'pop')
const triggers = apron.map((item) => new Trigger(callSign, aircraft, item.triggerTexts, item.responseText))

const check = (text) => {
  const results = triggers.map((trigger: Trigger) => trigger.detectTriggers(text))
  if (!results || !results.length) {
    return 'I do not understand your response'
  }

  const filteredResults = results.filter(result => !!result)

  console.log({ filteredResults })
  return filteredResults[0][1]
}

server.post('/test', (request, response) => {
  const data = check(request.body.transcript)
  return response.json({ data })
})
server.listen(8080, () => console.log('running'))
