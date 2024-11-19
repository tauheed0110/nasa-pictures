const input = document.getElementById('search-input');
const submit = document.getElementById('submit');
const imgContainer = document.getElementById('current-image-container');
const list = document.getElementById('search-history');

const api_key= "XwF6scp6n5lgFC83TUL1TbrzEoLu1gS2m8z8YnzX";
let localData = JSON.parse(localStorage.getItem('pastDates')) || [];

// let localData = JSON.parse(localStorage.getItem('pastDates')) || [];

submit.addEventListener('click', (e)=>{
    e.preventDefault();
    if(input.value.trim()){
        // do the following searches.
        const date = input.value.trim();
        getImageOfTheDay(date);
        // now save the dateto localstorage
        saveSearch(date);
    }else{
        const previousHtml = list.innerHTML;
        list.innerHTML =  `<p id="logError">Please select a Date</p>` + previousHtml;
    }
})



function getCurrentImageOfTheDay(){
    // This function should fetch the data for the current date from the NASA API and display it in the UI
    const currentDate = new Date().toISOString().split("T")[0];
    getImageOfTheDay(currentDate);
    // render nasa data;
    
}


function getImageOfTheDay(date){
    // This function should fetch the data for the selected date from the NASA API and display it in the UI.
    fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${api_key}`)
    .then(response => response.json())
    .then(data => {
        if(data.code){
            imgContainer.innerHTML = `<p id="logError">${data.msg}</p>`;
            throw new Error("Data not found");
        }else{
            renderData(data);
        }
    })
    .catch(error => {
        console.log(error);
    })
}

function saveSearch(date){
    // This function should save a date to local storage
    localData = JSON.parse(localStorage.getItem('pastDates')) || [];
    localData.push(date);
    localStorage.setItem('pastDates', JSON.stringify(localData));

    // now call the function to render dates in the ui
    addSearchToHistory(localData);
}

function addSearchToHistory(dates){
    //  This function should add the date to the search history list in the Ui.
    list.innerHTML = '';
    dates.map(date => {
        list.innerHTML += `<li><a href="#" onclick="getImageOfTheDay('${date}')">${date}</a></li>`;
    })
}

function renderData(data){
    imgContainer.innerHTML = `
        <h1>Picture on ${data.date}</h1>
        <img src="${data.hdurl || data.url}" alt="img loading..">
        <p id="title">${data.title}</p>
        <p id="description">${data.explanation}</p>
    `;
}

getCurrentImageOfTheDay();
addSearchToHistory(localData);

// https://github.com/tauheed0110/nasa-pictures.git