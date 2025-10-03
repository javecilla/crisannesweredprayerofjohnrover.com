/*
|--------------------------------------------------------------------------
| GALLERY CAROUSEL FUNCTIONALITY
|--------------------------------------------------------------------------
|
| Scripts for Gallery Carousel ng website. This gallery na
| nag-didisplay ng items in groups of 3 per slide.
|
| Features:
| 1. Multiple Items: 3 items per slide ang display
| 2. Navigation Buttons: May prev/next buttons para sa pag-navigate
| 3. Smart Dots: Maximum of 5 dots lang ang visible kahit maraming slides
| 4. Dynamic Generation: Naka-separate ang data sa presentation
|
*/

import carousel from '../../../common/carousel.js'

document.addEventListener('DOMContentLoaded', () => {
  // Generate 20 fake data entries for testing
  const fakeDataCarousel = Array.from({ length: 20 }, (_, index) => ({
    thumbnail: '/assets/images/default-image.png',
    name: `Name ${index + 1}`,
    description: `Description ${index + 1}`
  }))

  // Initialize the gallery carousel
  carousel({
    containerSelector: '.carousell-wrapper',
    dotsContainerSelector: '.carousell-dots',
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
