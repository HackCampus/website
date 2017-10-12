const letterPixels = require('./pixels')

function randomItem (array) {
  return array[Math.round(Math.random() * (array.length - 1))]
}

function closestIndex (haystack, needle) {
  let closest = 0
  for (let i = 0; i < haystack.length; i++) {
    if (needle >= haystack[i]) closest = i
  }
  return closest
}

function max (xs) {
  let max = -Infinity
  for (let i = 0; i < xs.length; i++) {
    if (max < xs[i]) max = xs[i]
  }
  return max
}

function unlerp (min, max, value) {
  return (value - min) / (max - min)
}

class Letters {
  constructor (container, text = 'HACKCAMPUS', color = 'black', interval = 10) {
    this.color = color
    this.text = Array.from(text)
    this.interval = interval

    const canvas = document.createElement('canvas')
    this.c = canvas.getContext('2d')
    container.appendChild(canvas)

    this.scale = window.devicePixelRatio || 1
    const height = container.offsetHeight
    const width = height * text.length
    this.width = width
    this.height = height
    container.width = width
    canvas.width = width * this.scale
    canvas.height = height * this.scale
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'

    this.letterSize = 8 // letter pixels
    this.pixelSize = Math.floor(this.height * this.scale / this.letterSize) // screen pixels

    this.currentPixels = this.getRandomPixels()
    this.nextPixels = this.getRandomPixels()

    this.t = 0
    this.dt = 1 / 60

    window.requestAnimationFrame(() => { this.draw() })
  }

  getRandomPixels () {
    return this.text.map(letter => randomItem(letterPixels[letter]))
  }

  draw () {
    if (this.t <= 1 + this.dt) {
      this.c.clearRect(0, 0, this.width * this.scale, this.height * this.scale)

      const ratio = this.t

      const currentColor = 'black'
      const nextColor = 'black'

      const nextProbability = Math.pow(ratio, 6)

      for (let i = 0; i < this.text.length; i++) {
        const currentLetter = this.currentPixels[i]
        const nextLetter = this.nextPixels[i]
        for (let p = 0; p < currentLetter.length; p++) {
          const displayNext = ratio !== 0 && Math.random() < nextProbability
          const pixel = displayNext ? nextLetter[p] : currentLetter[p]
          if (pixel === '1') {
            const x = p % this.letterSize
            const y = ~~(p / this.letterSize)
            const offset = i * this.letterSize
            this.drawPixel(offset + x, y)
          }
        }
      }
    }

    this.t += this.dt

    if (this.t > this.interval) {
      this.t = 0
      this.currentPixels = this.nextPixels
      this.nextPixels = this.getRandomPixels()
    }

    window.requestAnimationFrame(() => { this.draw() })
  }

  drawPixel (x, y) {
    this.c.fillStyle = this.color
    this.c.fillRect(x * this.pixelSize, y * this.pixelSize, this.pixelSize, this.pixelSize)
  }
}

module.exports = Letters
