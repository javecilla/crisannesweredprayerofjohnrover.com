/*
|--------------------------------------------------------------------------
| REUSABLE CAROUSEL FUNCTION
|--------------------------------------------------------------------------
|
| A reusable carousel function that can be used across different parts of the website.
| This implementation uses a functional approach for simplicity and readability.
|
| Parameters:
| - containerSelector: CSS selector for the carousel container
| - dotsContainerSelector: CSS selector for the dots container
| - data: Array of items to display in the carousel
| - itemsPerSlide: Number of items to show per slide
| - maxDots: Maximum number of navigation dots to display
| - renderItem: Function to render each item's HTML
|
*/
const carousel = ({
  containerSelector,
  dotsContainerSelector,
  data = [],
  itemsPerSlide = 1,
  maxDots = 5,
  renderItem = (item) => `<div>${item}</div>`
}) => {
  let currentIndex = 0
  let slides = []
  let dots = []

  const container = document.querySelector(containerSelector)
  const dotsContainer = document.querySelector(dotsContainerSelector)
  let prevBtn
  let nextBtn

  const generateSlides = () => {
    const slidesHTML = []

    for (let i = 0; i < data.length; i += itemsPerSlide) {
      const slideItems = data.slice(i, i + itemsPerSlide)
      const slideContent = slideItems.map(renderItem).join('')

      slidesHTML.push(`
        <div class="carousell-slide${i === 0 ? ' active' : ''}">
          ${slideContent}
        </div>
      `)
    }

    return slidesHTML.join('')
  }

  const addNavigationButtons = () => {
    const buttons = `
      <button type="button" class="prev-btn">
        <i class="fa-solid fa-arrow-left"></i>
      </button>
      <button type="button" class="next-btn">
        <i class="fa-solid fa-arrow-right"></i>
      </button>
    `
    container.insertAdjacentHTML('beforeend', buttons)
    prevBtn = container.querySelector('.prev-btn')
    nextBtn = container.querySelector('.next-btn')
  }

  const createDots = () => {
    const slideCount = Math.ceil(data.length / itemsPerSlide)
    const numDots = Math.min(slideCount, maxDots)
    dotsContainer.innerHTML = ''
    dots = []

    for (let i = 0; i < numDots; i++) {
      const dot = document.createElement('span')
      const icon = document.createElement('i')
      icon.className = 'fa-solid fa-circle'
      dot.appendChild(icon)

      dot.addEventListener('click', () => {
        const actualSlideIndex = Math.floor(slideCount * (i / numDots))
        goToSlide(actualSlideIndex)
      })

      dotsContainer.appendChild(dot)
      dots.push(dot)
    }
  }

  const updateSlides = () => {
    slides.forEach((slide) => slide.classList.remove('active'))
    slides[currentIndex].classList.add('active')
  }

  const updateDots = () => {
    const slideCount = Math.ceil(data.length / itemsPerSlide)
    const numDots = Math.min(slideCount, maxDots)

    dots.forEach((dot) => dot.classList.remove('active'))

    const activeDotIndex = Math.floor((currentIndex * numDots) / slideCount)
    if (dots[activeDotIndex]) {
      dots[activeDotIndex].classList.add('active')
    }
  }

  const updateNavigationButtons = () => {
    const slideCount = Math.ceil(data.length / itemsPerSlide)
    prevBtn.style.display = currentIndex === 0 ? 'none' : 'block'
    nextBtn.style.display = currentIndex === slideCount - 1 ? 'none' : 'block'
  }

  const goToSlide = (index) => {
    const slideCount = Math.ceil(data.length / itemsPerSlide)
    if (index >= 0 && index < slideCount) {
      currentIndex = index
      updateSlides()
      updateDots()
      updateNavigationButtons()
    }
  }

  const navigate = (direction) => {
    const slideCount = Math.ceil(data.length / itemsPerSlide)
    if (direction === 'next' && currentIndex < slideCount - 1) {
      currentIndex++
    } else if (direction === 'prev' && currentIndex > 0) {
      currentIndex--
    }

    updateSlides()
    updateDots()
    updateNavigationButtons()
  }

  const init = () => {
    // Generate and insert slides
    container.innerHTML = generateSlides()

    addNavigationButtons()
    createDots()

    // Cache slides
    slides = container.querySelectorAll('.carousell-slide')

    prevBtn.addEventListener('click', () => navigate('prev'))
    nextBtn.addEventListener('click', () => navigate('next'))

    updateNavigationButtons()
    updateDots()
  }

  // Initialize and expose public methods
  init()

  return {
    next: () => navigate('next'),
    prev: () => navigate('prev'),
    goToSlide
  }
}

export default carousel
