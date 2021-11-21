/**
 * Payload represents the incoming JSON body
 */
interface Payload {
  callSign: string
  frequency: string
  transcript: string
  aircraftType: string
  shortenedCallSign: string
  aircraftManufacturer: string
}

export { Payload }
