/**
 * Conversation represents the response text and triggers used by the fuzzy matching
 */
interface Conversation {
  responseText: string
  triggerTexts: string[]
}

export { Conversation }
