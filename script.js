window.addEventListener('load', () => {
  let long;
  let lat;
  let timeZone = document.querySelector('.location-timezone');
  let tempDegree = document.querySelector('.temperature-degree');
  let tempDescription = document.querySelector('.temperature-description');
  let iconClass = document.querySelector('.icons');
  let temperatureSection = document.querySelector('.degree-section')
  let temperatureSpan = document.querySelector('.degree-section span')
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      console.log(lat, long)
      const api = `https://api.weatherapi.com/v1/current.json?key=c60105aef66c4997bf1181933230401&q=${lat},${long}&aqi=no`;
      https://api.weatherapi.com/v1/current.json?key=c60105aef66c4997bf1181933230401 &q=6.4474,3.3903&aqi=no


      fetch(api)
        .then(res => res.json())
        .then(data => {
          console.log(data)
         console.log(data.current.temp_f)
          const temp_f = data.current.temp_f
          const temp_c = data.current.temp_c
          const tz_id = data.location.tz_id
          const weatherCondition = data.current.condition.text
         
          timeZone.innerHTML = tz_id
          tempDegree.innerHTML = temp_f
          tempDescription.innerHTML = weatherCondition
          const icon = `https:${data.current.condition.icon}` 
          // Set the background-image of the iconClass element to the icon URL
          iconClass.style.backgroundImage = `url(${icon})`;
 
          console.log("Displaying weather data:",
           temp_f, tz_id, weatherCondition, icon);

           // Change temperature to Celcius
         temperatureSection.addEventListener('click', () => {
          if (temperatureSpan.innerHTML === 'F') {
              temperatureSpan.textContent = 'C'
              tempDegree.innerHTML = temp_c
          } else {
            temperatureSpan.textContent = 'F'
            tempDegree.innerHTML = temp_f
          }
         })

          // Use a switch statement to determine which icon to display based on the current weather condition
          var skycons = new Skycons({"color": "white"});
          skycons.add("iconClass", Skycons.FOG);
          skycons.play();
           switch (weatherCondition) {
            case "Clear":
              skycons.set("icon", Skycons.CLEAR_DAY)
              break;
            case "Partly cloudy":
              skycons.set("icon", Skycons.PARTLY_CLOUDY_DAY)
              break;
            case "Cloudy":
              skycons.set("icon", Skycons.CLOUDY)
              break;
            case "Rain":
              skycons.set("icon", Skycons.RAIN)
              break;
            case "Mist":
              skycons.set("icon", Skycons.FOG)
              break;
            default:
              skycons.set("icon", Skycons.CLEAR_DAY)
              break;
          }

        })
        .catch(error => {  // Catch any errors that may occur
          console.error("An error occurred when trying to fetch the weather data:", error);  // Debugging line
        });
    });
  } else {
    alert('Your browser does not support geolocation');
  }

  // function setIcons(icon, iconId) {
   
  // }
});
