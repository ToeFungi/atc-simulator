import { Guarder } from 'guarder'

/**
 * Aircraft represents aircraft information
 */
class Aircraft {
  private readonly type: string
  private readonly manufacturer: string

  constructor(type: string, manufacturer: string) {
    Guarder.empty(type)
    Guarder.empty(manufacturer)

    this.type = type
    this.manufacturer = manufacturer
  }

  public getType(): string {
    return this.type
  }

  public getManufacturer(): string {
    return this.manufacturer
  }
}

export { Aircraft }
