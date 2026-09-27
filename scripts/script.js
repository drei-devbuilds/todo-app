const ul = document.querySelector('.list')
const add = document.querySelector('.add-button')
const input = document.querySelector('.add-input')
const search = document.querySelector('.search')
const list_items = document.querySelectorAll('li')
const delete_button = document.querySelector('.delete-button')
const modal = document.querySelector('.modal')
const modal_body = document.querySelector('.modal-body')


add.addEventListener('click', (e) => {
  if(input.value == ""){
    console.log("Input value Empty: Please Enter title")
  }else{
    //Create Element
    const li = document.createElement('li')
    const delete_button = document.createElement('button')
    const p = document.createElement('p')
    const edit_button = document.createElement('button')
    const submit_edit = document.createElement('button')
    const edit_input = document.createElement('input')
    const item_div = document.createElement('div')
    const button_div = document.createElement('div')

    item_div.classList.add('list-title')
    button_div.classList.add('list-buttons')
    delete_button.classList.add('delete-button')
    submit_edit.classList.add('submit-edit')
    li.classList.add('list-item')
    edit_button.classList.add('edit-button')
    edit_input.classList.add('edit-input')
    edit_input.placeholder = "Enter New Title";
    edit_input.type = "text"


    delete_button.textContent = 'Delete'
    edit_button.textContent = 'Edit'
    submit_edit.textContent = "Submit"
    p.textContent = input.value  
  
    item_div.append(p)
    button_div.append(delete_button)
    button_div.append(edit_button)
    button_div.append(edit_input)
    button_div.append(submit_edit)
    li.append(item_div)
    li.append(button_div)
    ul.prepend(li)

    input.value = ""
  }
})

search.addEventListener('input', (e) => {
  
  list_items.forEach(item => {

    if(item.firstElementChild.textContent.trim().toLowerCase().includes(e.target.value)){
      item.style.display = ""
    }else{
      item.style.display = "none"
    }
  })
  
})

ul.addEventListener('click', (e) => {

  if(e.target.className == 'delete-button'){
    const Del_button = e.target
    Del_button.closest('.list-item').remove()
  } else if (e.target.className == 'edit-button'){
    let target_item = e.target.closest('.list-item')
    let target_title = target_item.firstElementChild.firstElementChild.textContent.trim()
    openModal(target_title, target_item)
  }
})


const openModal = (old_title, target_item) => {
  modal.style.display = 'flex'
  modal_body.firstElementChild.value = old_title
  modal.addEventListener('click', (e) => {
    if(e.target.className == 'submit-edit'){
      console.log('submit edit button hit')
      let new_title = modal_body.firstElementChild.value.trim()
      if(old_title.toLowerCase === new_title.toLowerCase){
        closeModal()
      }else{
        target_item.firstElementChild.firstElementChild.textContent = new_title
        closeModal()
      }
    }
  })
}

const closeModal = () => {
  modal.style.display = 'none'
}