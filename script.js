
const form = document.querySelector('form');
const searchInput = document.getElementById('words');
const resultDiv = document.querySelector('.result');
const addToHistory = document.getElementById('history-tab');
const searchButton = document.getElementById('searchBtn')
const myHeading = document.getElementById('myHeading');
const HeadElement = document.getElementById('header');

const historyData = JSON.parse(window.localStorage.getItem('history')) || [];
searchButton.addEventListener('click', (e)=>{
    e.preventDefault();
    getWordInfo(searchInput.value);
});
let data;
const getWordInfo = async(word)=>{
    try {
        resultDiv.innerHTML = "Fetching Data...";
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    data = await response.json();
    console.log("word: ",data);
    const obj = {
        word: data[0].word,
        partOfSpeech: data[0].meanings[0].partOfSpeech,
        definition: data[0].meanings[0].definitions[0].definition
    }
    let definitions = data[0].meanings[0].definitions[0];
    resultDiv.innerHTML = `
        <h2><strong>Word:</strong>${obj.word}</h2>
        <p class="partOfSpeech">${obj.partOfSpeech}</p>
        <p><strong>Meaning:</strong>${obj.definition}</p>    
    `;
    historyData.push(obj)
    window.localStorage.setItem('history',JSON.stringify(historyData))

    // fetching 
    if(definitions.antonyms.length === 0){
        resultDiv.innerHTML += `<span>Not Found</span>`;
    }else{
        for(let i=0; i<definitions.antonyms.length; i++){
            resultDiv.innerHTML += `<li>${definitions.antonyms[i]}</li>`
        }
    }
    

    // adding Read More button

    // resultDiv.innerHTML += `<div><a href="${data[0].sourceUrls}">Read More</a></div>`
   
    } catch (error) {
        resultDiv.innerHTML = `<p>Sorry, the word could not be found</p>` ;  
    }
 
}

function switchTab1(event){
    window.location.pathname = "history.html";
    const historyElement = document.getElementById('history');
    for(let i=0; i<historyData.length; i++){
        const list = document.createElement('li');
        list.textContent = historyData[i];
        historyElement.appendChild(list);
    }
    const whoClickMe = event.target;
    console.log(whoClickMe);
}

function switchTab2(event){
    // window.location.pathname = "index.html";
    const whoClickMe = event.target;
    console.log(whoClickMe);
}

addToHistory.addEventListener('click',()=>{
    if(addToHistory.classList.contains('history-tab')){
        myHeading.innerText = "My DICTIONARY App History"
        addToHistory.innerText = "Search";
        HeadElement.style.display = "none";
        form.style.display = "none";
    }
})

addToHistory.addEventListener("click",switchTab1);
searchButton.addEventListener("click", switchTab2);






// <p><strong>Example:</strong>${definitions.example === undefined ? "Not Found" : definitions.example}</p>
// <p><strong>Antonyms:</strong></p>
