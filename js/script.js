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

let map, mapEvent;

class App {
  #map;
  #mapEvent;
  constructor() {
    this._getPosition();
    //   Reveal marker on the map
    form.addEventListener("submit", this._newWorkOut.bind(this));
    // toggle
    inputType.addEventListener("change", this._toggleElevationField.bind(this));
  }

  _getPosition() {
    // Get Geolocation API
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        // Success call back
        this._loadMap.bind(this),
        //   Error call back
        function () {
          alert("Could not find location");
        }
      );
  }

  _loadMap(position) {
    const { latitude, longitude } = position.coords;
    console.log(latitude, longitude);

    // Implement Leaflet
    this.#map = L.map("map").setView([latitude, longitude], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Add click event on map
    this.#map.on("click", this._showForm.bind(this));
  }

  _showForm(e) {
    // Reveal the hidden form
    form.classList.remove("hidden");
    inputDistance.focus();
    this.#mapEvent = e;

    console.log(e);
    console.log(e.latlng);
  }

  _toggleElevationField() {
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
  }

  _newWorkOut(e) {
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value =
      "";
    // Appear Marker on the map when it's submitted
    e.preventDefault();
    const { lat, lng } = this.#mapEvent.latlng;
    L.marker([lat, lng])
      .addTo(this.#map)
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
  }
}

const app = new App();

// Add toggle on inputElevation and inputCadence
