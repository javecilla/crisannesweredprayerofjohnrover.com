/*
|--------------------------------------------------------------------------
| ITEMS LIST MODULE (Functional Approach)
|--------------------------------------------------------------------------
|
| This file contains the items listing functionality and pagination
|
*/

const ITEMS_PER_PAGE = 10
const PAGINATION_BUTTONS_TO_SHOW = 3

// State management
let currentPage = 1
let currentSet = 1
let items = []
let filteredItems = []

// State management for filters
window.channelSelectedFilters = {
  channels: ['Sustainability & Environment']
}

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
  <a href="#">
    <div class="card">
      <div class="header">
        <img src="${item.user}" alt="img" />
        <h5>${item.name}</h5>
        •
        <span>16 hrs ago</span>
      </div>
      <div class="body">
        <h2>${item.title}</h2>
        <span>${item.channel}</span>
        <p>
          ${item.description}
        </p>
      </div>
      <div class="footer">
        <div>
          <img
            src="/assets/images/heart-icon-green.png"
            alt="icon"
          />
          <span>${item.likes}</span> likes
        </div>
        <div>
          <img
            src="/assets/images/message-icon-yellow.png"
            alt="icon"
          />
          <span>${item.comments}</span> comments
        </div>
      </div>
    </div>
  </a>
  `
}

function renderItems() {
  const dataToRender = filteredItems.length > 0 ? filteredItems : items
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const itemsToShow = dataToRender.slice(startIndex, endIndex)

  if (itemsToShow.length === 0) {
    wrapper.innerHTML =
      '<p style="text-align: center; padding: 2rem; color: #666;">No discussions found matching your filters.</p>'
  } else {
    wrapper.innerHTML = itemsToShow.map(createItemCard).join('')
  }
}

function setupPagination() {
  const dataToRender = filteredItems.length > 0 ? filteredItems : items
  const totalPages = Math.ceil(dataToRender.length / ITEMS_PER_PAGE)

  if (totalPages === 0) {
    pageItemsContainer.innerHTML = ''
    prevButton.disabled = true
    nextButton.disabled = true
    return
  }

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

  // Calculate max set
  const maxSet = Math.ceil(totalPages / PAGINATION_BUTTONS_TO_SHOW)

  // Disable/enable prev button
  prevButton.disabled = currentSet === 1

  // Disable/enable next button
  nextButton.disabled = currentSet >= maxSet
}

function nextPage() {
  const dataToRender = filteredItems.length > 0 ? filteredItems : items
  const totalPages = Math.ceil(dataToRender.length / ITEMS_PER_PAGE)
  const maxSet = Math.ceil(totalPages / PAGINATION_BUTTONS_TO_SHOW)

  if (currentSet < maxSet) {
    currentSet++
    // Move to the first page of the next set
    currentPage = (currentSet - 1) * PAGINATION_BUTTONS_TO_SHOW + 1
    renderItems()
    setupPagination()
  }
}

function previousPage() {
  if (currentSet > 1) {
    currentSet--
    // Move to the last page of the previous set (FIXED)
    const dataToRender = filteredItems.length > 0 ? filteredItems : items
    const totalPages = Math.ceil(dataToRender.length / ITEMS_PER_PAGE)
    const startPageOfSet = (currentSet - 1) * PAGINATION_BUTTONS_TO_SHOW + 1
    const endPageOfSet = Math.min(
      startPageOfSet + PAGINATION_BUTTONS_TO_SHOW - 1,
      totalPages
    )

    // Go to the last page of the previous set
    currentPage = endPageOfSet
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
  const response = await fetch(
    '/assets/scripts/auth/pages/discussions/dummydata.json'
  )
  const data = await response.json()
  return data.items
}

async function initItemsList() {
  try {
    items = await fetchItems()
    filteredItems = [] // Start with empty filtered items
    renderItems()
    setupPagination()
    updateStatusCount()
  } catch (error) {
    console.error('Error initializing items:', error)
  }
}

function setupEventListeners() {
  if (prevButton && nextButton) {
    prevButton.addEventListener('click', previousPage)
    nextButton.addEventListener('click', nextPage)
  } else {
    console.error('Navigation buttons not found in the DOM')
  }

  // Setup filter button click
  const filterButton = document.getElementById('btn-apply-filter')
  if (filterButton) {
    filterButton.addEventListener('click', () => {
      applyFilters()
    })
  }
}

// Filter related functions
function applyFilters() {
  console.log('Applying filters:', window.channelSelectedFilters)

  // If no channels are selected, show all items
  if (window.channelSelectedFilters.channels.length === 0) {
    filteredItems = []
  } else {
    // Filter items based on selected channels
    filteredItems = items.filter((item) => {
      // Check if the item's channel is in the selected channels array
      return window.channelSelectedFilters.channels.includes(item.channel)
    })
  }

  console.log('Filtered items count:', filteredItems.length)

  // Reset pagination to first page and first set
  currentPage = 1
  currentSet = 1

  // Update UI
  renderItems()
  setupPagination()
  updateStatusCount()
}

function removeFilter(filterName) {
  for (let key in window.channelSelectedFilters) {
    window.channelSelectedFilters[key] = window.channelSelectedFilters[
      key
    ].filter((f) => f !== filterName)
  }
  saveFiltersToStorage()
  updateSidebarCheckboxes()
  applyFilters()
}

function clearAllFilters() {
  window.channelSelectedFilters = {
    channels: []
  }
  saveFiltersToStorage()
  updateSidebarCheckboxes()
  applyFilters()
}

// Update status count in UI
function updateStatusCount() {
  const statusCountElement = document.querySelector('.status-count')

  if (statusCountElement) {
    const count = filteredItems.length > 0 ? filteredItems.length : items.length

    // Get the active filter text
    let filterText = ''
    if (window.channelSelectedFilters.channels.length > 0) {
      if (window.channelSelectedFilters.channels.length === 1) {
        filterText = ` for "${window.channelSelectedFilters.channels[0]}"`
      } else {
        filterText = ` for selected channels`
      }
    }

    statusCountElement.innerHTML = `<strong>${count.toLocaleString()}</strong> results found${filterText}`
  }
}

// Save/Load filters
function saveFiltersToStorage() {
  localStorage.setItem(
    'channelSelectedFilters',
    JSON.stringify(window.channelSelectedFilters)
  )
}

function loadFiltersFromStorage() {
  const stored = localStorage.getItem('channelSelectedFilters')
  if (stored) {
    window.channelSelectedFilters = JSON.parse(stored)
  }
}

// Expose updateSidebarCheckboxes function that sidebar.js might call
window.updateSidebarCheckboxes = function () {
  const checkboxes = document.querySelectorAll('aside input[type="checkbox"]')
  checkboxes.forEach((cb) => {
    const text = cb.value || cb.parentElement.textContent.trim()

    if (window.channelSelectedFilters.channels) {
      const isChecked = window.channelSelectedFilters.channels.includes(text)
      cb.checked = isChecked
    }
  })
}

// Export functions for sidebar.js to use
window.applyFilters = applyFilters
window.removeFilter = removeFilter
window.clearAllFilters = clearAllFilters

async function initializeApp() {
  try {
    initializeDOMElements()
    loadFiltersFromStorage()
    await initItemsList()
    setupEventListeners()
    // Apply initial filters after items are loaded
    applyFilters()
  } catch (error) {
    console.error('Error initializing app:', error)
  }
}

document.addEventListener('DOMContentLoaded', initializeApp)
