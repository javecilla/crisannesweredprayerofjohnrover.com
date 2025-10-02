import carousel from '../../common/carousel.js'

document.addEventListener('DOMContentLoaded', () => {
  // Generate 20 fake data entries for testing
  const fakeDataCarousel = Array.from({ length: 20 }, (_, index) => ({
    thumbnail: '/assets/images/default-image.png',
    name: `Name ${index + 1}`,
    description: `Description ${index + 1}`
  }))

  // Initialize the gallery carousel for Tips & Ideas
  carousel({
    containerSelector: '#carousell-wrapper-ideas',
    dotsContainerSelector: '#carousell-dots-ideas',
    data: fakeDataCarousel,
    itemsPerSlide: 3,
    maxDots: 5,
    renderItem: (item) => `
      <div class="card">
        <img src="${item.thumbnail}" alt="img" />
        <span>${item.name}</span>
        <p>${item.description}</p>
      </div>
    `
  })

  // Events & Meetups
  carousel({
    containerSelector: '#carousell-wrapper-events',
    dotsContainerSelector: '#carousell-dots-events',
    data: fakeDataCarousel,
    itemsPerSlide: 3,
    maxDots: 5,
    renderItem: (item) => `
      <div class="card">
        <img src="${item.thumbnail}" alt="img" />
        <span>${item.name}</span>
        <p>${item.description}</p>
      </div>
    `
  })

  // Discussions
  carousel({
    containerSelector: '#carousell-wrapper-discussions',
    dotsContainerSelector: '#carousell-dots-discussions',
    data: fakeDataCarousel,
    itemsPerSlide: 3,
    maxDots: 5,
    renderItem: (item) => `
      <div class="card">
        <img src="${item.thumbnail}" alt="img" />
        <span>${item.name}</span>
        <p>${item.description}</p>
      </div>
    `
  })
})
