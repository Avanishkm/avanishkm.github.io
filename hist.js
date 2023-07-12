let historyData = JSON.parse(window.localStorage.getItem('history')) || [];
let historyElement = document.getElementById('history');

    for(let i=0; i<historyData.length; i++){
        const list = document.createElement('li');
        list.innerHTML = ` 
            <h2><strong>Word:</strong>${historyData[i].word}</h2>
            <p class="partOfSpeech">${historyData[i].partOfSpeech}</p>
            <p><strong>Meaning:</strong>${historyData[i].definition}</p> 
            <button class="delete-btn">Delete</button> 
            
        `
        list.querySelector('.delete-btn').addEventListener("click",(e)=>{
            deleteWord(e,i);
        });
        historyElement.appendChild(list);
    }

    function deleteWord(e,i){
        e.target.parentElement.remove()
        historyData.splice(i, 1);
        window.localStorage.setItem('history',JSON.stringify(historyData))


    }
    