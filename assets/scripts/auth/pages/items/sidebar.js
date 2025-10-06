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
        if (parent.classList.contains('category')) {
          section = 'category'
        } else if (parent.classList.contains('condition')) {
          section = 'condition'
        } else if (parent.classList.contains('availability')) {
          section = 'availability'
        }
        parent = parent.parentElement
      }

      if (!section) {
        console.error('Could not determine section for checkbox')
        return
      }

      // Ensure the section exists in selectedFilters
      if (!window.selectedFilters[section]) {
        window.selectedFilters[section] = []
      }

      if (checkbox.checked) {
        // Add to filters if not already present
        if (!window.selectedFilters[section].includes(labelText)) {
          window.selectedFilters[section].push(labelText)
        }
      } else {
        // Remove from filters
        window.selectedFilters[section] = window.selectedFilters[
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

  // Add category filters
  if (
    window.selectedFilters.category &&
    window.selectedFilters.category.length
  ) {
    activeList.push(...window.selectedFilters.category)
  }

  // Add condition filters
  if (
    window.selectedFilters.condition &&
    window.selectedFilters.condition.length
  ) {
    activeList.push(...window.selectedFilters.condition)
  }

  // Add availability filters
  if (
    window.selectedFilters.availability &&
    window.selectedFilters.availability.length
  ) {
    activeList.push(...window.selectedFilters.availability)
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
      if (parent.classList.contains('category')) {
        section = 'category'
      } else if (parent.classList.contains('condition')) {
        section = 'condition'
      } else if (parent.classList.contains('availability')) {
        section = 'availability'
      }
      parent = parent.parentElement
    }

    if (section && window.selectedFilters[section]) {
      const isChecked = window.selectedFilters[section].includes(text)
      cb.checked = isChecked
    }
  })
}

// Load filters from localStorage or use defaults
function loadFiltersFromStorage() {
  const stored = localStorage.getItem('selectedFilters')
  if (stored) {
    window.selectedFilters = JSON.parse(stored)
  } else {
    window.selectedFilters = {
      category: ['Home & Living'],
      condition: ['New/Unused'],
      availability: []
    }
    saveFiltersToStorage()
  }
}

// Save filters to localStorage
function saveFiltersToStorage() {
  localStorage.setItem(
    'selectedFilters',
    JSON.stringify(window.selectedFilters)
  )
}

// Clear all filters
window.clearAllFilters = function () {
  // Reset all filters to empty arrays
  window.selectedFilters = {
    category: [],
    condition: [],
    availability: []
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
  ;['category', 'condition', 'availability'].forEach((section) => {
    if (window.selectedFilters[section]) {
      window.selectedFilters[section] = window.selectedFilters[section].filter(
        (f) => f !== filterText
      )
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
