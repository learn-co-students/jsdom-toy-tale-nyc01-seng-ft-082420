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

  const baseUrl = "http://localhost:3000/toys/"
  
  const renderToy = (toy, toyCollection) => {
    //create div with card class
    // add this HTML to the div 
    //   <h2>Woody</h2>
    //   <img src=toy_image_url class="toy-avatar" />
    //   <p>4 Likes </p>
    //   <button class="like-btn">Like <3 </button>
    //   </div>

    //append that new div to the toy-collection div
    
    const toyDiv = document.createElement("div")
    toyDiv.classList.add('card')

    toyDiv.innerHTML = ` 
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button class="like-btn" data-toy-id="${toy.id}">Like <3 </button>
    `

    toyCollection.append(toyDiv)
  }

  const renderToys = toys => {
    const toyCollection = document.querySelector("#toy-collection")
    
    for (const toy of toys)
      renderToy(toy, toyCollection)
  }


  const getToys = () => {
    fetch(baseUrl)
    .then(response => response.json())
    .then(toys => {
      renderToys(toys)
    })
  }

  const submitHandler = () => {
    const addToyForm = document.querySelector('.add-toy-form')

    addToyForm.addEventListener('submit', e => {
      e.preventDefault()
      const form = e.target

      const name = form.name.value 
      const image = form.image.value 

      const newToy = { name: name, image: image, likes: 0 }

      const options = {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "accept": "application/json"
        },
        body : JSON.stringify(newToy)
      }

      fetch(baseUrl, options)
      .then(response => response.json())
      .then(toy => {
        const toyCollection = document.querySelector("#toy-collection")
        renderToy(toy, toyCollection)
        document.querySelector('.add-toy-form').reset()
      })
    })

  }

  const clickHandler = () => {
    document.addEventListener('click', e => {
      if(e.target.matches(".like-btn")){
        const button = e.target
        const toyId = button.dataset.toyId
        const pTag = button.previousElementSibling
        const currentLikes = parseInt(pTag.textContent)
        const newLikes = currentLikes + 1

        options = {
          method: "PATCH",
          headers: {
            "content-type": "application/json"
            "accept": "application/json"
          },
          body: JSON.stringify({ likes: newLikes })
        }

        fetch(baseUrl + toyId, options)
        .then(response => response.json())
        .then(toy => {
          const button = document.querySelector(`[data-toy-id="${toy.id}]`)
          const pTag = button.previousElementSibling
          pTag.textContent = `${toy.likes} Likes`
        })

      }
    })
  }

  clickHandler()
  submitHandler()
  getToys()
});

/*
As a user, when i open the, i should see all the toys
  get request to /toys
  render each toy on the DOM

As a user, when I fill out the new toy form and sub it the
toy should appear at the bottom of the list and it should
persist on page reload.
  add a submit listener to the form
  on submit, get the data out of the text input
  do POST request/toys with the form data
  render that new toy


As a user, when I click the like button for a toy, its like count should
increment by 1 and the new count should persist on page reload.
  add click listners to like buttons
  on click
    increment likes on the DOM
    update the likes property in the DB

*/




//   const renderToy = (toys) => {
//     // set variable to toy collection div
//     const toyCollection = document.querySelector("#toy-collection");
//     // create the div class="card" html
//     toys.forEach(toy => {
//       const toyCardDiv = document.createElement("div")
//       toyCardDiv.classList.add("card")

//       const toyH2 = document.createElement("h2")
//       toyCardDiv.appendChild(toyH2)
//       toyH2.textContent = `${toy.name}`
      
//       const toyImg = document.createElement("img")
//       toyImg.classList.add("toy-avatar")
//       toyCardDiv.appendChild(toyImg)
//       toyImg.src = `${toy.image}`
      
//       const toyP = document.createElement("p")
//       toyCardDiv.appendChild(toyP)
//       toyP.textContent = `${toy.likes}`
      
//       const toyButton = document.createElement("button")
//       toyCardDiv.appendChild(toyButton)
//       toyButton.textContent = "Like"
//       toyCollection.appendChild(toyCardDiv)
//     }); 
//   }

//   const fetchToyInfo = () => {
//     fetch("http://localhost:3000/toys")
//     .then(response => response.json())
//     .then(toy => renderToy(toy))
//   }
//   fetchToyInfo();

//   let newToyBtn = document.getElementsByName("submit")
//   const addNewToyBtn = newToyBtn[0]
  
//   addNewToyBtn.addEventListener("click", e => {
//     e.preventDefault()

//     const createToys = () => {
//       let nInput = document.getElementsByName("name")
//       const newToyName = nInput[0].value
      
//       let imageInput = document.getElementsByName("image")
//       const newToyImage = imageInput[0].value
      
//       const options = {
//         method: "POST",
//         headers: {
//         "content-type": "application/json",
//         "accept": "application/json"
//         },
//         body: JSON.stringify({
//           "name": newToyName,
//           "image": newToyImage,
//           "likes": 0
//         })
//       }
//       fetch("http://localhost:3000/toys", options)
//       .then(response => response.json())
//       .then(toy => renderToy(toy))
//     }
//   })