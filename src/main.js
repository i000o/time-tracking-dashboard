import './style.css';

let hours; 

async function fetchData() { 
const response = await fetch('./data.json');
hours = await response.json(); 

showHours(hours); 
}

fetchData(); 

const buttons = document.querySelectorAll("button[type='button']"); 
const cards = document.querySelectorAll(".card");
const previousLabels = {
    daily: "Yesterday",
    weekly: "Last Week",
    monthly: "Last Month"
};

function updateDisplay(event) { 
const clickedButton = event.currentTarget; 
const period = clickedButton.dataset.path; // stores selected button 

// loop through the cards (work, social etc.) and inject data accordingly 
cards.forEach((card) => { 
    const categoryTitle = card.dataset.path; 

    // find the concurrent data 
    const category = hours.find((item) => { 
        return item.title === categoryTitle; 
    }); 

    const currentValue = category.timeframes[period].current; 
    const previousValue = category.timeframes[period].previous; 

    // find this card's spans and update 
    const currentSpan = card.querySelector(".current-hours"); 
    currentSpan.textContent = `${currentValue}hrs`; 
    currentSpan.style.display = 'block'; 

    const previousSpan = card.querySelector(".previous-hours"); 
    previousSpan.textContent = `${previousLabels[period]} - ${previousValue}hrs`; 
    previousSpan.style.display = 'block'; 
});
}

buttons.forEach((button) => { 
button.addEventListener("click", updateDisplay);
});

