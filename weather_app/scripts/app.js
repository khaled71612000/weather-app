const cityForm = document.querySelector('form')
const card = document.querySelector('.card')
const details = document.querySelector('.details')
const time = document.querySelector('img.time')
const icon = document.querySelector('.icon img')
const forecast = new Forecast()

const updateUI = (data) => {

    const {cityDets , weather} = data;
    // update template
    details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
    `
    // return num.svg value from api downloaded from site
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc)

    let timeSrc = weather.IsDayTime ?`img/day.svg` :`img/night.svg` ;
    time.setAttribute('src', timeSrc)

    if(card.classList.contains('d-none')) card.classList.remove('d-none')

}


cityForm.addEventListener('submit' , e=> {
    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    // reset ''
    cityForm.reset();

    forecast.updateCity(city)
    .then (data =>updateUI(data))
    .catch (err => console.log(err))

    localStorage.setItem('city',city);

})
// update latest city 
if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city'))
    .then (data => updateUI(data))
    .catch(err => console.log(err))
}