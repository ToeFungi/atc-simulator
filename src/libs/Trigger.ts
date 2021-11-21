import { Aircraft } from './Aircraft'
import { CallSign } from './CallSign'
import { Conversation } from '../types/Conversation'
import { TriggerResult } from '../types/TriggerResult'

import fuzzySet from 'fuzzyset.js'

import { Guarder } from 'guarder'

class Trigger {
  private readonly aircraft: Aircraft
  private readonly callSign: CallSign

  private readonly threshold: number
  private readonly responseText: string
  private readonly triggerTexts: string[]

  constructor(callSign: CallSign, aircraft: Aircraft, conversation: Conversation, threshold: number = 0.8) {
    Guarder.empty(callSign)
    Guarder.empty(aircraft)
    Guarder.empty(conversation.responseText)
    Guarder.empty(conversation.triggerTexts)

    this.aircraft = aircraft
    this.callSign = callSign
    this.threshold = threshold

    this.responseText = conversation.responseText.replace('{{callSign}}', callSign.getCallSign())
      .replace('{{shortenedCallSign}}', callSign.getShortenedCallSign())

    this.triggerTexts = conversation.triggerTexts.map((triggerText: string) => triggerText.replace('{{callSign}}', callSign.getCallSign()))
      .map((triggerText: string) => triggerText.replace('{{shortenedCallSign}}', callSign.getShortenedCallSign()))
      .map((triggerText: string) => triggerText.replace('{{aircraftManufacturer}}', aircraft.getManufacturer()))
      .map((triggerText: string) => triggerText.replace('{{aircraftType}}', aircraft.getType()))
  }

  public detectTriggers(text: string): TriggerResult {
    const matchingSet = fuzzySet(this.triggerTexts)

    const result = matchingSet.get(text)

    if (!result || !result.length) {
      return {
        confidence: 0,
        message: ''
      }
    }

    const [confidence] = result[0]

    if (confidence > this.threshold) {
      return {
        confidence,
        message: this.responseText
      }
    }

    return {
      confidence: 0,
      message: ''
    }
  }
}

export { Trigger }
