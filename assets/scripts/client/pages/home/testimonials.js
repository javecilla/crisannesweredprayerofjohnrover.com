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
    },
    {
      name: 'Luisa Fernandez',
      role: 'Local Business Owner',
      image: '/assets/images/default-profile.png',
      title: 'Supporting Local Communities',
      content: `This platform has allowed my business to give back to the community in a meaningful way. 
        Donating surplus items has not only helped those in need but also strengthened our ties with 
        local residents. It's a win-win for everyone involved.`
    },
    {
      name: 'Carlos Mendoza',
      role: 'Tech Enthusiast',
      image: '/assets/images/default-profile.png',
      title: 'Innovative and User-Friendly',
      content: `I love how easy it is to navigate and use this platform. The user interface is intuitive,
        making it simple to list items or find what I need. The tech behind it is impressive, and it's
        clear that a lot of thought has gone into creating a seamless experience for users.`
    },
    {
      name: 'Sofia Lopez',
      role: 'Parent',
      image: '/assets/images/default-profile.png',
      title: 'A Lifesaver for Families',
      content: `As a parent, this platform has been a lifesaver. I've been able to find gently used items
        for my children, saving money while also teaching them the value of reusing and recycling.`
    },
    {
      name: 'Javier Torres',
      role: 'Retiree',
      image: '/assets/images/default-profile.png',
      title: 'Staying Active and Engaged',
      content: `In my retirement, I've found a new purpose through this platform. It's a great way to stay active, meet new people, and contribute to the community. I love being part of something that makes a difference.`
    },
    {
      name: 'Elena Cruz',
      role: 'Artist',
      image: '/assets/images/default-profile.png',
      title: 'Inspiring Creativity',
      content: `This platform has been a source of inspiration for my art. I've found unique materials and items that have sparked new ideas and projects. It's wonderful to see how creativity can flourish through sharing and reusing.`
    },
    {
      name: 'Ricardo Alvarez',
      role: 'Fitness Enthusiast',
      image: '/assets/images/default-profile.png',
      title: 'Staying Fit and Active',
      content: `This platform has been a game-changer for my fitness journey. I've discovered new workout gear, found workout buddies, and even shared my own equipment. It's all about community support and staying motivated together.`
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

      // Generate only 8 dots regardless of total slides
      const maxDots = 8
      const dotsHTML = Array(Math.min(maxDots, this.slideCount))
        .fill()
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
      this.dots[this.getDotIndex(this.currentIndex)].classList.remove('active')

      // Update current index
      this.currentIndex = index

      // Add active class to new slide and dot
      this.slides[this.currentIndex].classList.add('active')
      this.dots[this.getDotIndex(this.currentIndex)].classList.add('active')
    },

    getDotIndex(slideIndex) {
      // Map the slide index to a dot index (0-7)
      const maxDots = Math.min(8, this.slideCount)
      return slideIndex % maxDots
    }
  }

  // Initialize the carousel
  testimonialCarousel.init()
})
