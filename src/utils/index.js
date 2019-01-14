export const randomColor = () => {
  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min
  }
  const R = `F${randomNumber(0, 15).toString(16)}`
  const G = `F${randomNumber(0, 15).toString(16)}`
  const B = `F${randomNumber(0, 15).toString(16)}`
  return `#${R}${G}${B}`
}
