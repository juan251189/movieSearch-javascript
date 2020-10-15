const form = document.querySelector('form');
const input = document.querySelector('#searchTerm');
const resultsSection=document.querySelector('#results');
const API_url = 'http://www.omdbapi.com/?apikey=1468b66e&t=movie&s=';
form.addEventListener('submit',formSubmitted);

async function formSubmitted(event){
  event.preventDefault();
  const searchTerm = input.value;
  try{
  const results = await getResult(searchTerm)
  showResults(results);
} catch(error){
  showError(error);
}
}

async function getResult(searchTerm){
  const url = `${API_url}${searchTerm}`;
  const response = await fetch(url);
  const data = await response.json();
    if(data.Error){
      throw new Error(data.Error);
    }

    console.log(data);
    return data.Search;
}

function showResults(results){
  resultsSection.innerHTML = results.reduce((html,movie) => {
    return  html +`
      <div class="card col-4" >
<img class="card-img-top" src="${movie.Poster}" alt="${movie.Title}">
<div class="card-body">
  <h5 class="card-title">${movie.Title}</h5>
  <p class="card-text">${movie.Year}</p>
  <a href="#" class="btn btn-primary">Play</a>
    <button class="btn btn-danger" type="button" name="button">Watch  Later</button>
</div>
</div>
      `;

    },'');


}

const watchLaterButtons=document.querySelectorAll('.watch-later-button');
watchLaterButtons.forEach(button => {
  button.addEventListener('click',(event)=>{
    console.log('button was clicked');
  })
})
function showError(error){
  resultsSection.innerHTML = `
  <div class="alert alert-danger col" role="alert"> ${error.message}</div>`;
}
