/*
|--------------------------------------------------------------------------
| TESTIMONIAL CAROUSEL FUNCTIONALITY
|--------------------------------------------------------------------------
|
| Script para sa testimonial carousel ng website. 
| Features ng script na 'to:
|
| 1. Auto-Slide: May automatic na pag-switch ng testimonials every 5 seconds
| 2. Navigation Dots: Pwedeng i-click yung dots para lumipat sa specific na slide
| 3. Dynamic Content: Naka-store lahat ng testimonial data sa array para madaling
|    mag-add or mag-edit ng testimonials
|
| Pag-gagamitin:
| - Mag-add lang ng bagong data sa testimonialData array
| - Pwedeng i-customize ang interval sa startAutoPlay() method
| - May active class na automatic na nag-aadd/remove para sa styling
|
| Note: Make sure na tama ang path ng images at proper ang formatting ng content
| para iwas sa layout issues.
|
*/

document.addEventListener('DOMContentLoaded', () => {
  // Testimonial data
  const testimonialData = [
    {
      name: 'Juan Dela Cruz',
      role: 'Community Member',
      image: '/assets/images/default-profile.png',
      title: 'Great Way to Help Others!',
      content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam repellendus 
        commodi ad excepturi aperiam voluptatem ratione optio, ab deserunt dolore id necessitatibus 
        dignissimos eius nam explicabo? Ullam dolorum dicta saepe.`
    },
    {
      name: 'Maria Santos',
      role: 'Regular Donor',
      image: '/assets/images/default-profile.png',
      title: 'Makes Decluttering Meaningful',
      content: `Nulla facilisi. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
        commodo consequat.`
    },
    {
      name: 'Pedro Reyes',
      role: 'Happy Recipient',
      image: '/assets/images/default-profile.png',
      title: 'Found What I Needed!',
      content: `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
        officia deserunt.`
    },
    {
      name: 'Ana Rivera',
      role: 'Environmental Advocate',
      image: '/assets/images/default-profile.png',
      title: 'Making a Real Impact',
      content: `Fantastic initiative that helps both people and the environment. Through this platform, 
        I've been able to share items that would otherwise end up in landfills. It's amazing to see 
        how one person's unused items can bring joy to others.`
    },
    {
      name: 'Miguel Garcia',
      role: 'Student Volunteer',
      image: '/assets/images/default-profile.png',
      title: 'Building Community Connections',
      content: `As a student, this platform has been incredible. Not only have I found useful items 
        for my studies, but I've also met amazing people who share the same values about sustainability 
        and community support. It's more than just exchanging items.`
    }
  ]

  const testimonialCarousel = {
    container: document.querySelector('.testimonial-slides'),
    dotsContainer: document.querySelector('.testimonial-dots'),
    slides: [],
    dots: [],
    currentIndex: 0,
    slideCount: testimonialData.length,
    autoPlayInterval: null,

    init() {
      // Generate HTML for testimonials
      this.generateTestimonials()

      // Initialize slides and dots after generation
      this.slides = document.querySelectorAll('.testimonial-slide')
      this.dots = document.querySelectorAll('.testimonial-dots span')

      // Add click events to dots
      this.dots.forEach((dot, index) => {
        dot.addEventListener('click', () => this.goToSlide(index))
      })

      // Start autoplay
      this.startAutoPlay()
    },

    generateTestimonials() {
      // Generate slides
      const slidesHTML = testimonialData
        .map(
          (item, index) => `
        <div class="testimonial-slide${index === 0 ? ' active' : ''}">
          <div class="card">
            <div class="profile-container">
              <img src="${item.image}" alt="${item.name}" />
              <div class="profile-name">
                <h6>${item.name}</h6>
                <span>${item.role}</span>
              </div>
            </div>
            <div class="context">
              <h5>${item.title}</h5>
              <p>${item.content}</p>
            </div>
          </div>
        </div>
      `
        )
        .join('')

      // Generate dots
      const dotsHTML = testimonialData
        .map(
          (_, index) => `
        <span class="${index === 0 ? 'active' : ''}"></span>
      `
        )
        .join('')

      // Insert the generated HTML
      this.container.insertAdjacentHTML('afterbegin', slidesHTML)
      this.dotsContainer.innerHTML = dotsHTML
    },

    startAutoPlay() {
      // Change slide every 5 seconds
      this.autoPlayInterval = setInterval(() => {
        this.nextSlide()
      }, 5000)
    },

    stopAutoPlay() {
      if (this.autoPlayInterval) {
        clearInterval(this.autoPlayInterval)
      }
    },

    nextSlide() {
      this.goToSlide((this.currentIndex + 1) % this.slideCount)
    },

    goToSlide(index) {
      // Remove active class from current slide and dot
      this.slides[this.currentIndex].classList.remove('active')
      this.dots[this.currentIndex].classList.remove('active')

      // Update current index
      this.currentIndex = index

      // Add active class to new slide and dot
      this.slides[this.currentIndex].classList.add('active')
      this.dots[this.currentIndex].classList.add('active')
    }
  }

  // Initialize the carousel
  testimonialCarousel.init()
})
