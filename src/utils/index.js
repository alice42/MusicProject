import { shuffle, padStart, join, random } from 'lodash'

let tt = 0

export const randomColor = () => {
  const randomNumber = (min, max) => random(min, max)
  const toHex = value => padStart(value.toString(16), 2, '0')

  const colorLow = '78'
  const colorHigh = () => `${toHex(randomNumber(190, 255))}`

  const colors = shuffle([
    colorLow,
    colorHigh(),
    shuffle([colorLow, colorHigh()])[0]
  ])

  return `#${join(colors, '')}`
}
