  const ul = document.querySelector('.list')
  const addButton = document.querySelector('.add-button')
  const addInput = document.querySelector('.add-input')
  const search = document.querySelector('.search')

  const modal = document.querySelector('.modal')
  const modalInput = document.querySelector('.modal-input')
  const modalSubmit = document.querySelector('.modal-submit')
  const modalCancel = document.querySelector('.modal-cancel')

  const alertDiv = document.querySelector('.alert')
  const alertImage = document.querySelector('.alert__image')
  const alertTitle = document.querySelector('.alert__title')

  let currentEditItem = null;
  let alertTimeout = null;

  //Create
  addButton.addEventListener('click', (e) => {
    clearTimeout(alertTimeout)
    const title = addInput.value.trim()
    const listItems = Array.from(document.querySelectorAll('.list-item'))

    if(title ===''){
      openAlert('Failed', 'Error: Empty Field')
      alertTimeout = setTimeout(() => closeAlert(), 3000)
      return
    }

    const duplicateChecker = listItems.find((item) => {
      item = item.firstElementChild.firstElementChild.textContent.toLowerCase().trim()
      return item === title.toLowerCase();
    })

    if(duplicateChecker){
      openAlert('Failed', 'Error: Item Already exist')
      alertTimeout = setTimeout(() => closeAlert(), 3000)
      addInput.value = '';
      return
    }

    createTodo(title)
    openAlert('Success', 'Addition Successful')

    alertTimeout = setTimeout(() => closeAlert(), 3000)
    addInput.value = ''
  })

  //read
  search.addEventListener('input', (e) => {
    const searchValue = search.value.trim().toLowerCase()
    const listItems = document.querySelectorAll('.list-item')

    listItems.forEach((item) => {
      const titleList = item.firstElementChild.firstElementChild.textContent.trim().toLowerCase()
      if (titleList.includes(searchValue)){
        item.closest('.list-item').style.display = 'flex'
      }else{
        item.closest('.list-item').style.display = 'none'
      }
    })
  })

  //Update and Delete
  ul.addEventListener('click', (e) => {

    if (e.target.id.includes('list__icon--delete')){
      clearTimeout(alertTimeout)
      const listItem = e.target.closest('.list-item')

      if (listItem) {
        listItem.remove()
        openAlert('Success', 'Delete Successful')
        setTimeout(() => closeAlert(), 2000)
      }else{
        openAlert('Failed', 'Delete Failed')
        setTimeout(() => closeAlert(), 2000)
      }
    }

    if (e.target.id.includes('list__icon--edit')) {
      clearTimeout(alertTimeout)
      const listItem = e.target.closest('.list-item')

      if (listItem) {
        currentEditItem = listItem
        openModal()
      } else {
        openAlert('Failed', 'Edit Failed')
        setTimeout(() => closeAlert(), 2000)
      }
    }
  })



  const createTodo = (title) =>{
    
    //item container
    let li = document.createElement('li')

    //item title
    let titleDiv = document.createElement('div')
    let titleText = document.createElement('p')

    //item buttons
    let listButtons = document.createElement('div')
    let deleteButton = document.createElement('button')
    let editButton = document.createElement('button')

    //button Images
    let deleteIcon = document.createElement('img')
    let editIcon = document.createElement('img')

    //ADD CLASSES AND OTHER TAGS

    //classes item container
    li.classList.add('list-item')

    //classes item title
    titleDiv.classList.add('list-title')

    //classes item buttons
    listButtons.classList.add('list-buttons')
      //delete button
      deleteButton.classList.add('list__button')
      deleteButton.id.add = 'list__delete';

      //edit button
      editButton.classList.add('list__button')
      editButton.id = 'list__edit';

      //delete icon
      deleteIcon.classList.add('list__icon')
      deleteIcon.id = 'list__icon--delete';
      deleteIcon.src = '../assets/delete-icon.svg';
      deleteIcon.alt = 'delete'

      //edit icon
      editIcon.classList.add('list__icon')
      editIcon.id.add = 'list__icon--edit';
      editIcon.src = '../assets/edit-icon.svg';
      editIcon.alt = 'edit'

    //add title to title element
    titleText.textContent = title;

    //Insert Elements to each place

    //title section
    titleDiv.append(titleText)

    //button section
    deleteButton.append(deleteIcon)
    editButton.append(editIcon)

    listButtons.append(deleteButton)
    listButtons.append(editButton)

    //insert to li
    li.append(titleDiv)
    li.append(listButtons)

    ul.prepend(li)
  }


const openAlert = (status, message) => {
  alertImage.src = `../assets/${status.toLowerCase()}-icon.svg`;
  alertTitle.textContent = message
  alertDiv.classList.add('alert--active')
}


const closeAlert = () => {
  alertDiv.classList.remove('alert--active')
}

const openModal = () => {
  modal.style.display = 'flex'
  modalInput.value = currentEditItem.querySelector('.list-title p').textContent
  modalInput.focus()
}

modalSubmit.addEventListener('click', () => {
  let currentTitle = currentEditItem.querySelector('.list-title p').textContent.trim().toLowerCase()
  let newtitle = modalInput.value

  if(newtitle.trim().toLowerCase() === currentTitle){
    openAlert('Failed', 'No changes detected')
    setTimeout(() => closeAlert(), 2000)
    return
  }

  editItem(newtitle)
})


modalCancel.addEventListener('click', () => {
    closeModal()
})

const closeModal =() => {
  modal.style.display = 'none'
}

const editItem = (title) => {
  if(title === ''){
    openAlert('Failed', 'Empty Value')
    setTimeout(() => closeAlert(), 2000)
    return
  }

  currentEditItem.querySelector('.list-title p').textContent = title
  closeModal()
}