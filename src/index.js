let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  const renderToy = (toys) => {
    // set variable to toy collection div
    const toyCollection = document.querySelector("#toy-collection");
    // create the div class="card" html
    toys.forEach(toy => {
      const toyCardDiv = document.createElement("div")
      toyCardDiv.classList.add("card")

      const toyH2 = document.createElement("h2")
      toyCardDiv.appendChild(toyH2)
      toyH2.textContent = `${toy.name}`
      
      const toyImg = document.createElement("img")
      toyImg.classList.add("toy-avatar")
      toyCardDiv.appendChild(toyImg)
      toyImg.src = `${toy.image}`
      
      const toyP = document.createElement("p")
      toyCardDiv.appendChild(toyP)
      toyP.textContent = `${toy.likes}`
      
      const toyButton = document.createElement("button")
      toyCardDiv.appendChild(toyButton)
      toyButton.textContent = "Like"
      toyCollection.appendChild(toyCardDiv)
    }); 
  }

  const fetchToyInfo = () => {
    fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(toy => renderToy(toy))
  }
  fetchToyInfo();

  const createToys = () => {
    let nInput = document.getElementsByName("name")
    const newToyName = nInput[0].value
    
    let imageInput = document.getElementsByName("image")
    const newToyImage = imageInput[0].value
 

    const options = {
      method: "POST",
      headers: {
      "content-type": "application/json",
      "accept": "application/json"
      },
      body: JSON.stringify({
        "name": newToyName,
        "image": newToyImage,
        "likes": 0
      })
    }
    fetch("http://localhost:3000/toys", options)
    .then(response => response.json())
    .then(toy => renderToy(toy))
  }

  let newToyBtn = document.getElementsByName("submit")
  const addNewToyBtn = newToyBtn[0]
  addNewToyBtn.addEventListener("click", () => {
    
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
});
