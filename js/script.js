"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

/*1. navigator -- allow gps
  2. get leaflet.js library
  3. modify the popup and text */

// Get Geolocation API
if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    // Success call back
    function (position) {
      const { latitude, longitude } = position.coords;
      console.log(latitude, longitude);

      // Implement Leaflet
      var map = L.map("map").setView([latitude, longitude], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Add click event
      map.on("click", function (e) {
        console.log("clicked");
        console.log(e.latlng);
        const { lat, lng } = e.latlng;
        L.marker([lat, lng])
          .addTo(map)
          // add popup effect and style
          .bindPopup(
            L.popup({
              maxWidth: 250,
              minWidth: 100,
              autoClose: false,
              closeOnClick: false,
              className: "running-popup",
            })
          )
          // Add popup Content
          .setPopupContent("Work Out")
          .openPopup();
      });
    },
    //   Error call back
    function () {
      alert("Could not find location");
    }
  );
