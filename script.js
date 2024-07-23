
const weatherForm=document.querySelector("form");
const cityInput=document.querySelector("#input-weather");
const card=document.querySelector(".card");
const apiKey="c9fc7d1a936b4e527325eb052b3fffc6";


weatherForm.addEventListener("submit",async event=>{

    event.preventDefault();

    const city=cityInput.value;

    // console.log(city);

    if(city)
    {
        try{
            const weatherData=await getWeatherData(city);
            console.log(weatherData);
            displayWeatherData(weatherData);
        }
        catch(e){
            displayError(e);
        }
    }
    else{
        displayError('please enter a city');
    }

});

async function  getWeatherData(city)
{
    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    
    const response=await fetch(apiUrl);

    if(!response.ok)
    {
        throw new Error('could not fetch');
    }
    return await response.json();
}

function displayWeatherData(data)
{
    const {name:city, main:{humidity,temp},weather:[{description,id}]}=data;
   

    const citydisplay=document.createElement("p");
    const tempdisplay=document.createElement("p");
    const humiditydisplay=document.createElement("p");
    const descdisplay=document.createElement("p");
    const weatheremoji=document.createElement("p");

    citydisplay.textContent=city;
    tempdisplay.textContent=`${((temp - 273.15) * (9/5) + 32).toFixed(1)}°F`;
    humiditydisplay.textContent=humidity;
    descdisplay.textContent=description;
    weatheremoji.textContent = getWeatherEmoji(id);



    citydisplay.classList.add("cityDisplay");
    tempdisplay.classList.add("temDisplay");
    humiditydisplay.classList.add("HumidityDisplay");
    descdisplay.classList.add("desDisplay");
    weatheremoji.classList.add("weatherEmoji");


    card.textContent="";
    card.style.display="block";
    
    card.appendChild(citydisplay);
    card.appendChild(tempdisplay);
    card.appendChild(humiditydisplay);
    card.appendChild(descdisplay);
    card.appendChild(weatheremoji);
}
function getWeatherEmoji(weatherId){

    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "🌧️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId === 800):
            return "☀️";
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
        default:
            return "";
    }
}
function displayError(e)
{
    const errorDis=document.createElement("p");
    errorDis.textContent=e;
    errorDis.classList.add("errorDisplay");

    card.textContent="";
    card.style.display="flex";
    card.appendChild(errorDis);
}