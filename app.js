const form = document.querySelector('form');
const input = document.querySelector('#searchTerm');
const resultsSection=document.querySelector('#results');
const API_url = 'http://www.omdbapi.com/?apikey=1468b66e&t=movie&s=';
form.addEventListener('submit',formSubmitted);

function formSubmitted(event){
  event.preventDefault();
  const searchTerm = input.value;
  getResult(searchTerm)

}

function getResult(searchTerm){
  const url = `${API_url}${searchTerm}`;
  fetch(url)
  .then(response => response.json())
    .then(data => showResults(data.Search));
}

function showResults(results){
  resultsSection.innerHTML ='';
  const html='';
  results.forEach(movie => {
      html += `<h3>${movie.Title}</h3>`;
  });
    resultsSection.innerHTML = html;
}
