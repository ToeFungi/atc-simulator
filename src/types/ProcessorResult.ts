import { TriggerResult } from './TriggerResult'

/**
 * Processor results represent the message and confidence of the fuzzy match results and includes the name of the
 * specific processor
 */
interface ProcessorResult extends TriggerResult {
  name: string
}

export { ProcessorResult }
