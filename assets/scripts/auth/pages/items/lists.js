/*
|--------------------------------------------------------------------------
| ITEMS LIST MODULE (Functional Approach)
|--------------------------------------------------------------------------
|
| This file contains the items listing functionality and pagination
|
*/

const ITEMS_PER_PAGE = 12
const PAGINATION_BUTTONS_TO_SHOW = 3

// State management
let currentPage = 1
let currentSet = 1
let items = []

let wrapper
let pagination
let prevButton
let nextButton
let pageItemsContainer

function initializeDOMElements() {
  wrapper = document.querySelector('.lists-content .wrapper')
  pagination = document.querySelector('.pagination')
  prevButton = pagination.querySelector('#btn-prev')
  nextButton = pagination.querySelector('#btn-next')
  pageItemsContainer = pagination.querySelector('.page-item')
}

function createItemCard(item) {
  return `
    <a href="specific-item.html?id=${item.id}">
      <div class="card">
        <div class="header-content">
          <img src="${item.user}" alt="img" />
          <span class="badge text-bg-warning">${item.category}</span>
        </div>
        <img src="${item.thumbnail}" alt="img" />
        <div class="body-content">
          <div class="left-side">
            <h6>${item.name}</h6>
            <span>Condition: ${item.condition}</span>
            <p>${item.description}</p>
          </div>
          <div class="right-side">
            <img src="/assets/images/hand-arrow-down-icon.png" alt="img" />
          </div>
        </div>
      </div>
    </a>
  `
}

function renderItems() {
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const itemsToShow = items.slice(startIndex, endIndex)
  wrapper.innerHTML = itemsToShow.map(createItemCard).join('')
}

function setupPagination() {
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE)
  const startPage = (currentSet - 1) * PAGINATION_BUTTONS_TO_SHOW + 1
  const endPage = Math.min(
    startPage + PAGINATION_BUTTONS_TO_SHOW - 1,
    totalPages
  )

  pageItemsContainer.innerHTML = ''

  for (let i = startPage; i <= endPage; i++) {
    const button = document.createElement('button')
    button.type = 'button'
    button.textContent = i
    if (i === currentPage) button.classList.add('active')
    button.addEventListener('click', () => {
      currentPage = i
      renderItems()
      setupPagination()
    })
    pageItemsContainer.appendChild(button)
  }

  // Disable prev/next properly
  prevButton.disabled = currentSet === 1
  const maxSet = Math.ceil(totalPages / PAGINATION_BUTTONS_TO_SHOW)
  nextButton.disabled = currentSet === maxSet
}

function nextPage() {
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE)
  const maxSet = Math.ceil(totalPages / PAGINATION_BUTTONS_TO_SHOW)

  if (currentSet < maxSet) {
    currentSet++
    // move to the first page of the next set
    const newPage = (currentSet - 1) * PAGINATION_BUTTONS_TO_SHOW + 1
    currentPage = newPage
    renderItems()
    setupPagination()
  }
}

function previousPage() {
  if (currentSet > 1) {
    currentSet--
    // move to the first page of the previous set
    const newPage = (currentSet - 1) * PAGINATION_BUTTONS_TO_SHOW + 1
    currentPage = newPage
    renderItems()
    setupPagination()
  }
}

function goToPage(page) {
  currentPage = page
  renderItems()
  setupPagination()
}

async function fetchItems() {
  // Simulating API response
  // return Array.from({ length: 100 }, (_, index) => ({
  //   id: index + 1,
  //   name: `Item Name ${index + 1}`,
  //   description: 'Description preview...',
  //   condition: 'New/Unused',
  //   category: 'Category',
  //   thumbnail: '/assets/images/default-image.png',
  //   user: '/assets/images/profile-anime.png'
  // }))
  const response = await fetch(
    '/assets/scripts/auth/pages/items/dummydata.json'
  )
  const data = await response.json()
  return data.items
}

async function initItemsList() {
  try {
    items = await fetchItems()
    renderItems()
    setupPagination()
  } catch (error) {
    console.error('Error initializing items:', error)
  }
}

function setupEventListeners() {
  if (prevButton && nextButton) {
    // Remove existing listeners if any
    prevButton.removeEventListener('click', previousPage)
    nextButton.removeEventListener('click', nextPage)

    // Add new listeners
    prevButton.addEventListener('click', previousPage)
    nextButton.addEventListener('click', nextPage)
  } else {
    console.error('Navigation buttons not found in the DOM')
  }
}

async function initializeApp() {
  try {
    initializeDOMElements()
    setupEventListeners()
    await initItemsList()
  } catch (error) {
    console.error('Error initializing app:', error)
  }
}

document.addEventListener('DOMContentLoaded', initializeApp)
