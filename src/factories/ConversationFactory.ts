import { ConversationProcessor } from '../processors/ConversationProcessor'

class ConversationFactory {
  public getConversationProcessor(frequency: string): ConversationProcessor {
    const parsedFrequency = parseFloat(frequency)

    if (parsedFrequency === 122.65) {
      return new ConversationProcessor('Cape Town Apron', '../resources/apron.json')
    }

    if (parsedFrequency === 121.9) {
      return new ConversationProcessor('Cape Town Ground', '../resources/ground.json')
    }

    throw new Error('Not implemented.')
  }
}

export { ConversationFactory }
