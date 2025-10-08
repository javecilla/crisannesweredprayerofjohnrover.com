document.addEventListener('DOMContentLoaded', () => {
  // File Upload Implementation
  // Store uploaded files
  let uploadedFiles = []

  const fileInput = document.getElementById('photo')
  const uploadArea = document.querySelector('.upload-area')
  const photoCount = document.querySelector('.photo-count')
  const uploadItems = document.querySelector('.upload-items')
  const itemsWrapper = document.querySelector('.items-wrapper')
  const clearAllBtn = document.querySelector('.upload-items > button')

  // Initially hide the preview section
  photoCount.style.display = 'none'
  uploadItems.style.display = 'none'

  fileInput.addEventListener('change', handleFiles)

  uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault()
    uploadArea.style.borderColor = '#198754'
    uploadArea.style.backgroundColor = '#f0f8f4'
  })

  uploadArea.addEventListener('dragleave', (e) => {
    e.preventDefault()
    uploadArea.style.borderColor = '#dee2e6'
    uploadArea.style.backgroundColor = '#ffffff'
  })

  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault()
    uploadArea.style.borderColor = '#dee2e6'
    uploadArea.style.backgroundColor = '#ffffff'

    const files = Array.from(e.dataTransfer.files)
    addFiles(files)
  })

  // Handle files from input or drag-drop
  function handleFiles(e) {
    const files = Array.from(e.target.files)
    addFiles(files)
  }

  function addFiles(files) {
    // Filter only image files
    const imageFiles = files.filter((file) => file.type.startsWith('image/'))

    // Check if adding these files exceeds the limit of 5
    const remainingSlots = 5 - uploadedFiles.length

    if (remainingSlots === 0) {
      alert('Maximum 5 photos allowed. Please remove some photos first.')
      return
    }

    if (imageFiles.length > remainingSlots) {
      alert(
        `You can only upload ${remainingSlots} more photo(s). Maximum is 5 photos.`
      )
      imageFiles.splice(remainingSlots)
    }

    imageFiles.forEach((file) => {
      uploadedFiles.push(file)
    })

    updateFileInput()
    renderUploadedFiles()
  }

  function updateFileInput() {
    // Create a new DataTransfer object
    const dataTransfer = new DataTransfer()

    // Add all files to the DataTransfer
    uploadedFiles.forEach((file) => {
      dataTransfer.items.add(file)
    })

    // Update the file input
    fileInput.files = dataTransfer.files
  }

  function renderUploadedFiles() {
    // Clear the wrapper
    itemsWrapper.innerHTML = ''

    // Show or hide the preview section
    if (uploadedFiles.length === 0) {
      photoCount.style.display = 'none'
      uploadItems.style.display = 'none'
      return
    }

    photoCount.style.display = 'inline-block'
    uploadItems.style.display = 'flex'

    // Update photo count
    const photoText = uploadedFiles.length === 1 ? 'photo' : 'photos'
    photoCount.textContent = `${uploadedFiles.length} ${photoText} uploaded`

    // Render each file
    uploadedFiles.forEach((file, index) => {
      const card = document.createElement('div')
      card.className = 'card'

      // Create delete button
      const deleteBtn = document.createElement('button')
      deleteBtn.type = 'button'
      deleteBtn.title = 'Remove photo'
      deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
      deleteBtn.addEventListener('click', () => removeFile(index))

      // Create image element
      const img = document.createElement('img')
      img.alt = `Photo ${index + 1}`

      // Create object URL for preview
      const objectURL = URL.createObjectURL(file)
      img.src = objectURL

      // Revoke object URL when image loads to free memory
      img.onload = () => {
        URL.revokeObjectURL(objectURL)
      }

      card.appendChild(deleteBtn)
      card.appendChild(img)
      itemsWrapper.appendChild(card)
    })
  }

  function removeFile(index) {
    uploadedFiles.splice(index, 1)

    updateFileInput()
    renderUploadedFiles()
  }

  function clearAllFiles() {
    // Confirm before clearing
    if (uploadedFiles.length === 0) return

    const confirmed = confirm(
      `Are you sure you want to remove all ${uploadedFiles.length} photos?`
    )

    if (confirmed) {
      uploadedFiles = []
      updateFileInput()
      renderUploadedFiles()
    }
  }

  // Add event listener to clear all button
  clearAllBtn.addEventListener('click', clearAllFiles)

  // Optional bahala ka kung ano validation mo jan sa back end mo: (e.g., max 5MB per file)
  function validateFileSize(file) {
    const maxSize = 5 * 1024 * 1024 // 5MB in bytes
    return file.size <= maxSize
  }

  // function addFilesWithValidation(files) {
  //   const imageFiles = files.filter((file) => {
  //     if (!file.type.startsWith('image/')) {
  //       return false
  //     }
  //     if (!validateFileSize(file)) {
  //       alert(`File "${file.name}" is too large. Maximum size is 5MB.`)
  //       return false
  //     }
  //     return true
  //   })

  //   const remainingSlots = 5 - uploadedFiles.length

  //   if (remainingSlots === 0) {
  //     alert('Maximum 5 photos allowed. Please remove some photos first.')
  //     return
  //   }

  //   if (imageFiles.length > remainingSlots) {
  //     alert(
  //       `You can only upload ${remainingSlots} more photo(s). Maximum is 5 photos.`
  //     )
  //     imageFiles.splice(remainingSlots)
  //   }

  //   imageFiles.forEach((file) => {
  //     uploadedFiles.push(file)
  //   })

  //   updateFileInput()
  //   renderUploadedFiles()
  // }

  // Export functions if needed (for use in form submission)
  window.uploadModule = {
    getUploadedFiles: () => uploadedFiles,
    clearAllFiles: clearAllFiles,
    hasFiles: () => uploadedFiles.length > 0
  }

  // Optional: Form submission example
  /*
document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  if (uploadedFiles.length === 0) {
    alert('Please upload at least one photo.');
    return;
  }

  // Create FormData
  const formData = new FormData();
  
  // Add all files
  uploadedFiles.forEach((file, index) => {
    formData.append('photos[]', file);
  });
  
  // Add other form fields
  formData.append('itemName', document.getElementById('itemName').value);
  formData.append('shortDescription', document.getElementById('shortDescription').value);
  // ... add other fields
  
  // Send to server
  fetch('/api/items', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
});
*/
})
