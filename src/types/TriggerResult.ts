/**
 * Trigger results represent the message and confidence of a fuzzy match on specific triggers
 */
interface TriggerResult {
  message: string
  confidence: number
}

export { TriggerResult }
