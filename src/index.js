let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  const toyUrl = 'http://localhost:3000/toys/'
  function fetchToy(){
    fetch(toyUrl)
    .then(resp => resp.json())
    .then(json => renderToys(json))
  }
  let toyCollection = document.querySelector('#toy-collection')

  function renderToy(toy){
    let div = document.createElement('div')
    div.classList.add('card')
    div.dataset.id = toy.id
    div.innerHTML = `<h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>`
    toyCollection.appendChild(div)
  }

  function renderToys(json){
    for(const toy of json){
      renderToy(toy)
    }
  }

  const createObj = (name, image) => {
    const object = {
      name: name,
      image: image,
      likes: 0
    }
    const configObj = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(object)
    }
    fetch(toyUrl,configObj)
    .then(resp => resp.json())
    .then(toy => renderToy(toy))
  }

  const addLike = (likes, newLikes, id) => {
    object = {
      likes: newLikes
    }
    const configObj = {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(object)
    }
    fetch(toyUrl + id, configObj)
    .then(resp => resp.json())
    .then(toy => likes.textContent = `${toy.likes} Likes`)
  }
  function clickHandler(){
    document.addEventListener('click', function(e){
      if(e.target.matches('.like-btn')){
        let div = e.target.parentNode
        let id = div.dataset.id
        let likes = div.querySelector('p')
        let newLikes = parseInt(likes.textContent) + 1
        addLike(likes, newLikes, id)
      }
    })
  }

  function submitHandler(){
    document.addEventListener('submit',function(e){
      let form = e.target
      if (form.matches('.add-toy-form')){
        let name = form.querySelector(`[name="name"]`).value
        let image = form.querySelector(`[name="image"]`).value
        createObj(name, image)
        form.reset();
        e.preventDefault();
      }
    })
  }



  fetchToy();
  clickHandler();
  submitHandler();
});
