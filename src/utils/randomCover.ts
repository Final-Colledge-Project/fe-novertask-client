const images = [
  '/img/item-cover-1.jpg',
  '/img/item-cover-2.png',
  '/img/item-cover-3.jpg',
  '/img/item-cover-4.jpg',
  '/img/item-cover-5.jpg',
  '/img/item-cover-6.png',
  '/img/item-cover-7.png'
]

const randomCover = () => {
  const max = images.length
  const randomIndex = Math.floor(Math.random() * (max - 0 + 1) + 0)
  return images[randomIndex]
}
export default randomCover
