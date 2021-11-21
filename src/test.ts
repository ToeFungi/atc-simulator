import fuzzySet from 'fuzzyset.js'
import { Phonetical } from 'phonetical'


const callSign = 'ZSPOP'
const shortenedCallSign = 'POP'
const phoneticalCallSign = Phonetical.toPhonetics(callSign)
const phoneticalShortenedCallSign = Phonetical.toPhonetics(shortenedCallSign)
// const replacements = [
//   {
//     replace: '{{callSign}}',
//     value: phoneticalCallSign
//   }
// ]

const expected = 'Apron student zulu sierra papa oscar papa good day'
const test = fuzzySet([
  `cape town apron student ${phoneticalCallSign} good day`,
  `cape town april student ${phoneticalCallSign} good day`,
  `cape town apron student ${phoneticalShortenedCallSign} good day`,
  `cape town april student ${phoneticalShortenedCallSign} good day`
])

const [confidence] = test.get(expected)[0]

if (confidence > 0.95) {
  console.log({ confidence }, 'Success')
} else {
  console.log({ confidence }, 'Fail')
}
