const Letters = require('./letters')
const YouTubePlayer = require('youtube-player')

document.addEventListener('DOMContentLoaded', () => {
  new Letters($('#hackcampus-letters')[0], 'HACKCAMPUS', 'black')
  setupScrollNagger()
  setupHeroVideo('0f0RXeZUM4k')
})

function setupScrollNagger () {
  const scrollArrow = $('.scroll-arrow')
  scrollArrow.addClass('show')
  $(window).one('scroll', () => {
    scrollArrow.addClass('fade-out')
  })
}

function setupHeroVideo (videoId) {
  $('#watch-video').click(() => {
    const background = $('.hero-video-container')
    background.css('visibility', 'visible')
    background.css('opacity', '1')
    window.youTubePlayer = window.youTubePlayer || YouTubePlayer('hero-video', {
      playerVars: {
        modestbranding: 1,
        showinfo: 0,
        rel: 0,
      },
    })
    window.youTubePlayer.loadVideoById(videoId)
    window.youTubePlayer.playVideo()
    background.one('click', () => {
      background.css('opacity', '0')
      setTimeout(() => {
        window.youTubePlayer.stopVideo()
        background.css('visibility', 'hidden')
      }, 500)
    })
  })
}
