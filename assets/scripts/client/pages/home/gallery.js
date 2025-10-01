/*
|--------------------------------------------------------------------------
| GALLERY CAROUSEL FUNCTIONALITY
|--------------------------------------------------------------------------
|
| This will load fake data gallery for now in a coursel.
|
*/
document.addEventListener('DOMContentLoaded', () => {
  // Generate 20 fake data entries (dito  replace mo nalang ng actual data from api kung saan mo man kukuhain)
  const fakeDataCarousel = Array.from({ length: 20 }, (_, index) => ({
    thumbnail: '/assets/images/default-image.png',
    name: `Name ${index + 1}`,
    description: `Description ${index + 1}`
  }))

  const generateCarouselSlides = (data) => {
    const slidesHTML = []
    const itemsPerSlide = 3

    for (let i = 0; i < data.length; i += itemsPerSlide) {
      const slideItems = data.slice(i, i + itemsPerSlide)
      const slideContent = slideItems
        .map(
          (item) => `
          <div class="card">
            <img src="${item.thumbnail}" alt="img" />
            <span>${item.name}</span>
            <p>${item.description}</p>
          </div>
        `
        )
        .join('')

      slidesHTML.push(`
        <div class="carousell-slide${i === 0 ? ' active' : ''}">
          ${slideContent}
        </div>
      `)
    }

    return slidesHTML.join('')
  }

  // Update carousel container with generated slides
  const carouselContainer = document.querySelector('.carousell-container')
  const navigationButtons = `
    <button type="button" class="prev-btn">
      <i class="fa-solid fa-arrow-left"></i>
    </button>
    <button type="button" class="next-btn">
      <i class="fa-solid fa-arrow-right"></i>
    </button>
  `

  carouselContainer.innerHTML =
    generateCarouselSlides(fakeDataCarousel) + navigationButtons

  const carousel = {
    container: document.querySelector('.carousell-container'),
    slides: document.querySelectorAll('.carousell-slide'),
    dotsContainer: document.querySelector('.carousell-dots'),
    dots: [],
    prevBtn: document.querySelector('.prev-btn'),
    nextBtn: document.querySelector('.next-btn'),
    currentIndex: 0,
    slideCount: document.querySelectorAll('.carousell-slide').length,
    maxDots: 5, // Maximum number of dots to display

    init() {
      // Initialize navigation buttons
      this.prevBtn.addEventListener('click', () => this.navigate('prev'))
      this.nextBtn.addEventListener('click', () => this.navigate('next'))

      // Create dots dynamically
      this.createDots()

      // Show/hide prev button on initial load
      this.updateNavigationButtons()
      this.updateDots()
    },

    createDots() {
      // Clear existing dots
      this.dotsContainer.innerHTML = ''
      this.dots = []

      // Calculate how many dots to show (max 5)
      const numDots = Math.min(this.slideCount, this.maxDots)

      // Create new dots
      for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('span')
        const icon = document.createElement('i')
        icon.className = 'fa-solid fa-circle'
        dot.appendChild(icon)

        // Add click event listener
        dot.addEventListener('click', () => {
          const actualSlideIndex = Math.floor(this.slideCount * (i / numDots))
          this.goToSlide(actualSlideIndex)
        })

        this.dotsContainer.appendChild(dot)
        this.dots.push(dot)
      }
    },

    navigate(direction) {
      if (direction === 'next' && this.currentIndex < this.slideCount - 1) {
        this.currentIndex++
      } else if (direction === 'prev' && this.currentIndex > 0) {
        this.currentIndex--
      }

      this.updateSlides()
      this.updateDots()
      this.updateNavigationButtons()
    },

    goToSlide(index) {
      if (index >= 0 && index < this.slideCount) {
        this.currentIndex = index
        this.updateSlides()
        this.updateDots()
        this.updateNavigationButtons()
      }
    },

    updateSlides() {
      this.slides.forEach((slide) => slide.classList.remove('active'))
      this.slides[this.currentIndex].classList.add('active')
    },

    updateDots() {
      // Remove active class from all dots
      this.dots.forEach((dot) => dot.classList.remove('active'))

      // Calculate which dot should be active
      const numDots = Math.min(this.slideCount, this.maxDots)
      const activeDotIndex = Math.floor(
        (this.currentIndex * numDots) / this.slideCount
      )

      // Add active class to current dot
      if (this.dots[activeDotIndex]) {
        this.dots[activeDotIndex].classList.add('active')
      }
    },

    updateNavigationButtons() {
      this.prevBtn.style.display = this.currentIndex === 0 ? 'none' : 'block'
      this.nextBtn.style.display =
        this.currentIndex === this.slideCount - 1 ? 'none' : 'block'
    }
  }

  carousel.init()
})
