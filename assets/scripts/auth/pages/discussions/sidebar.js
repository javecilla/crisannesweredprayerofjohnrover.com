//sidebar.js
function setupFilterListeners() {
  const checkboxes = document.querySelectorAll('aside input[type="checkbox"]')
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      // Get the value from the checkbox or fallback to label text
      const labelText =
        checkbox.value || checkbox.parentElement.textContent.trim()

      // Get the correct section by finding the parent div with class category/condition/availability
      let section = null
      let parent = checkbox.closest('div')

      // Traverse up to find the section container
      while (parent && !section) {
        if (parent.classList.contains('channels')) {
          section = 'channels'
        }

        parent = parent.parentElement
      }

      if (!section) {
        console.error('Could not determine section for checkbox')
        return
      }

      // Ensure the section exists in channelSelectedFilters
      if (!window.channelSelectedFilters[section]) {
        window.channelSelectedFilters[section] = []
      }

      if (checkbox.checked) {
        // Add to filters if not already present
        if (!window.channelSelectedFilters[section].includes(labelText)) {
          window.channelSelectedFilters[section].push(labelText)
        }
      } else {
        // Remove from filters
        window.channelSelectedFilters[section] = window.channelSelectedFilters[
          section
        ].filter((f) => f !== labelText)
      }

      // Save to localStorage after any change
      saveFiltersToStorage()

      // Update the active filters display immediately
      renderActiveFilters()

      // Apply filters to update the items list
      window.applyFilters()
    })
  })
}

function renderActiveFilters() {
  const activeFiltersContainer = document.querySelector('.active-filters')
  activeFiltersContainer.innerHTML = ''

  // Get all active filters
  const activeList = []

  // Add channels filters
  if (
    window.channelSelectedFilters.channels &&
    window.channelSelectedFilters.channels.length
  ) {
    activeList.push(...window.channelSelectedFilters.channels)
  }

  if (activeList.length > 0) {
    // Add clear all button
    const clearSpan = document.createElement('span')
    clearSpan.innerHTML = `<i class="fa-solid fa-x"></i> Clear Filters`
    clearSpan.addEventListener('click', () => window.clearAllFilters())
    activeFiltersContainer.appendChild(clearSpan)

    // Add individual filter tags
    activeList.forEach((filter) => {
      const span = document.createElement('span')
      span.innerHTML = `<i class="fa-solid fa-x"></i> ${filter}`
      span.addEventListener('click', () => window.removeFilter(filter))
      activeFiltersContainer.appendChild(span)
    })
  }
}

function updateSidebarCheckboxes() {
  const checkboxes = document.querySelectorAll('aside input[type="checkbox"]')
  checkboxes.forEach((cb) => {
    const text = cb.value || cb.parentElement.textContent.trim()

    // Find the correct section
    let section = null
    let parent = cb.closest('div')

    while (parent && !section) {
      if (parent.classList.contains('channels')) {
        section = 'channels'
      }

      parent = parent.parentElement
    }

    if (section && window.channelSelectedFilters[section]) {
      const isChecked = window.channelSelectedFilters[section].includes(text)
      cb.checked = isChecked
    }
  })
}

// Load filters from localStorage or use defaults
function loadFiltersFromStorage() {
  const stored = localStorage.getItem('channelSelectedFilters')
  if (stored) {
    window.channelSelectedFilters = JSON.parse(stored)
  } else {
    window.channelSelectedFilters = {
      channels: ['Sustainability & Environment']
    }
    saveFiltersToStorage()
  }
}

// Save filters to localStorage
function saveFiltersToStorage() {
  localStorage.setItem(
    'channelSelectedFilters',
    JSON.stringify(window.channelSelectedFilters)
  )
}

// Clear all filters
window.clearAllFilters = function () {
  // Reset all filters to empty arrays
  window.channelSelectedFilters = {
    channels: []
  }

  // Save to localStorage
  saveFiltersToStorage()

  // Uncheck all checkboxes in the sidebar
  updateSidebarCheckboxes()

  // Update the active filters display
  renderActiveFilters()

  // Apply filters to update the items list
  window.applyFilters()
}

// Remove individual filter
window.removeFilter = function (filterText) {
  // Find and remove from the appropriate section
  ;['channels'].forEach((section) => {
    if (window.channelSelectedFilters[section]) {
      window.channelSelectedFilters[section] = window.channelSelectedFilters[
        section
      ].filter((f) => f !== filterText)
    }
  })

  // Save to localStorage
  saveFiltersToStorage()

  // Update checkboxes in the sidebar
  updateSidebarCheckboxes()

  // Update the active filters display
  renderActiveFilters()

  // Apply filters to update the items list
  window.applyFilters()
}

document.addEventListener('DOMContentLoaded', () => {
  loadFiltersFromStorage()
  setupFilterListeners()
  updateSidebarCheckboxes()
  renderActiveFilters()
})
