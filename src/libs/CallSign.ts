import { Guarder } from 'guarder'
import { Phonetical } from 'phonetical'

class CallSign {
  private readonly callSign: string
  private readonly shortenedCallSign: string

  constructor(callSign: string, shortenedCallSign: string) {
    Guarder.empty(callSign)
    Guarder.empty(shortenedCallSign)

    this.callSign = Phonetical.toPhonetics(callSign)
    this.shortenedCallSign = Phonetical.toPhonetics(shortenedCallSign)
  }

  public getCallSign(): string {
    return this.callSign
  }

  public getShortenedCallSign(): string {
    return this.shortenedCallSign
  }
}

export { CallSign }
