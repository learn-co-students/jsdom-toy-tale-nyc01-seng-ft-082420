let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  fetch('http://localhost:3000/toys')
  .then(function(response){
    return response.json();
  }).then(function(json) {
    for (const toy in json) {
      let div = document.createElement('div')
      div.classList.add('card')
        let h2 = document.createElement('h2')
        h2.innerText = json[toy]['name']
        div.append(h2)

        let img = document.createElement('img')
        img.src= json[toy]['image']
        img.classList.add('toy-avatar')
        div.append(img)

        let p = document.createElement('p')
        p.innerText = json[toy]['likes'] + " Likes"
        div.append(p)

        let button = document.createElement('button')
        button.innerText = "Like <3"
        button.classList.add('like-btn')
        button.setAttribute('id', json[toy]['id'])
        div.append(button)

      toyCollection = document.getElementById('toy-collection')
      toyCollection.append(div)
    }
  })


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

  const toyForm = document.querySelector('.add-toy-form')
  toyForm.addEventListener('submit', function(e) {
    e.preventDefault()
    const form = e.target
    const toyName = form.name.value
    const toyPic = form.image.value

    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: toyName,
        image: toyPic,
        likes: 0
      })
    })
    .then(function(response){
      return response.json()
    })
    .then(function(toy){
      let div = document.createElement('div')
        div.classList.add('card')
        let h2 = document.createElement('h2')
        h2.innerText = toy['name']
        div.append(h2)

        let img = document.createElement('img')
        img.src= toy['image']
        img.classList.add('toy-avatar')
        div.append(img)

        let p = document.createElement('p')
        p.innerText = toy['likes'] + " Likes"
        div.append(p)

        let button = document.createElement('button')
        button.innerText = "Like <3"
        button.setAttribute('id', toy.id)
        button.classList.add('like-btn')
        div.append(button)

        toyCollection = document.getElementById('toy-collection')
        toyCollection.append(div)
    })



  })

  document.addEventListener('click', function(e){
    if (e.target.matches('.like-btn')){
      likeCount = parseInt(e.target.previousElementSibling.innerText) + 1
      fetch('http://localhost:3000/toys/${e.target.id}', {
        method: 'PATCH',
        headers: {
          "Content-Type" : "application/json",
          "Accept" : "application/json"
        },
        body: JSON.stringify({
          "likes": likeCount
        })
      })
      .then(function(response){
        return response.json()
      })
      .then(function(json){
        e.target.previousElementSibling.innerText = `${likeCount} likes`;
      })

    }
  })

});
