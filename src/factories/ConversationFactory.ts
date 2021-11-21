import { Frequencies } from '../enums/Frequencies'
import { ConversationProcessor } from '../processors/ConversationProcessor'

/**
 * Conversation factory returns the configured conversation processor
 */
class ConversationFactory {
  /**
   * Get the configured conversation processor
   */
  public getConversationProcessor(frequency: string): ConversationProcessor {
    const parsedFrequency = parseFloat(frequency)

    if (parsedFrequency === Frequencies.CAPE_TOWN_APRON) {
      return new ConversationProcessor('Cape Town Apron', '../resources/apron.json')
    }

    if (parsedFrequency === Frequencies.CAPE_TOWN_GROUND) {
      return new ConversationProcessor('Cape Town Ground', '../resources/ground.json')
    }

    throw new Error('Not implemented.')
  }
}

export { ConversationFactory }
