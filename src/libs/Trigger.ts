import { Aircraft } from './Aircraft'
import { CallSign } from './CallSign'

import fuzzySet from 'fuzzyset.js'
import { Guarder } from 'guarder'

class Trigger {
  private readonly aircraft: Aircraft
  private readonly callSign: CallSign
  private readonly responseText: string
  private readonly triggerTexts: string[]

  constructor(callSign: CallSign, aircraft: Aircraft, triggerTexts: string[], responseText: string) {
    Guarder.empty(callSign)
    Guarder.empty(aircraft)
    Guarder.empty(triggerTexts)
    Guarder.empty(responseText)

    this.aircraft = aircraft
    this.callSign = callSign

    this.responseText = responseText.replace('{{callSign}}', callSign.getCallSign())
      .replace('{{shortenedCallSign}}', callSign.getShortenedCallSign())

    this.triggerTexts = triggerTexts.map((triggerText: string) => triggerText.replace('{{callSign}}', callSign.getCallSign()))
      .map((triggerText: string) => triggerText.replace('{{shortenedCallSign}}', callSign.getShortenedCallSign()))
      .map((triggerText: string) => triggerText.replace('{{aircraftManufacturer}}', aircraft.getManufacturer()))
      .map((triggerText: string) => triggerText.replace('{{aircraftType}}', aircraft.getType()))
  }

  public detectTriggers(text: string) {
    const matchingSet = fuzzySet(this.triggerTexts)

    const result = matchingSet.get(text)

    if (!result || !result.length) {
      return null
    }

    const [confidence] = result[0]

    if (confidence > 0.8) {
      return [confidence, this.responseText]
    }

    return null
  }
}

export { Trigger }
