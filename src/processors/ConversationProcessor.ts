import { Trigger } from '../libs/Trigger'
import { Payload } from '../types/Payload'
import { Aircraft } from '../libs/Aircraft'
import { CallSign } from '../libs/CallSign'
import { Conversation } from '../types/Conversation'
import { TriggerResult } from '../types/TriggerResult'
import { ProcessorResult } from '../types/ProcessorResult'

/**
 * Conversation Processor facilitates the matching of text against conversations and returns the appropriate response
 * text
 */
class ConversationProcessor {
  private readonly name: string
  private readonly conversation: Conversation[]

  constructor(name: string, filePath: string) {
    this.name = name
    this.conversation = require(filePath)
  }

  /**
   * Match the text against triggers for the specified processor and get the response text
   */
  public matchTriggers(payload: Payload): ProcessorResult {
    const aircraft = new Aircraft(payload.aircraftType, payload.aircraftManufacturer)
    const callSign = new CallSign(payload.callSign, payload.shortenedCallSign)
    const triggers = this.conversation.map((conversation: Conversation) => new Trigger(callSign, aircraft, conversation))

    const results: TriggerResult[] = triggers.map((trigger: Trigger) => trigger.detectTriggers(payload.transcript))

    if (!results || !results.length) {
      return {
        confidence: 0,
        name: this.name,
        message: 'I did not understand, please ensure you are on the correct frequency'
      }
    }

    const filteredResults = results.filter((result: TriggerResult) => !!result)
      .filter((result: TriggerResult) => result.confidence > 0)
      .sort((a: TriggerResult, b: TriggerResult) => b.confidence - a.confidence)

    if (!filteredResults.length) {
      return {
        confidence: 0,
        name: this.name,
        message: 'I did not understand, please ensure you are on the correct frequency'
      }
    }

    return {
      ...filteredResults[0],
      name: this.name
    }
  }
}

export { ConversationProcessor }
