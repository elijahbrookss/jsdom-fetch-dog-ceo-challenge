const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = 'https://dog.ceo/api/breeds/list/all';

document.addEventListener("DOMContentLoaded", function(){
  fetchImage();
  fetchBreed();
});

function fetchBreed(){
  fetch(breedUrl).then(resp => resp.json()).then((json) => {
    parseBreeds(json.message);
    filterBreeds(json.message);
  });
}

function filterBreeds(blist){
  const dropdown = document.getElementById('breed-dropdown')

  dropdown.addEventListener("change", event=>{
    let letterChosen = dropdown.value;
    bRemover(letterChosen, blist)
  });
}

function bRemover(letterChosen, blist){
  const filteredBreeds = [];

  for (let breed in blist){
    if (breed.charAt(0) == letterChosen){
      filteredBreeds[breed] = (breed)
    }
  }

  parseBreeds(filteredBreeds);
}

function parseBreeds(blist){
  const ul = document.getElementById('dog-breeds');
  ul.innerHTML = "";

  for (let breed in blist){
    const li = document.createElement("li")
    const text = document.createElement("text")

    text.textContent = breed
    li.appendChild(text)
    ul.appendChild(li)

    li.addEventListener("click", event => {
      event.target.style = "color: green"
    })
  }
}

function fetchImage(){
  fetch(imgUrl).then(resp => resp.json())
  .then(json => parseImages(json.message))
}

function parseImages(images){
  const imgContainer = document.querySelector("#dog-image-container")
  images.forEach((imageURL, i) => {
    let imgTag = document.createElement("img");
    imgTag.src = imageURL;

    imgContainer.appendChild(imgTag);
  });
}
