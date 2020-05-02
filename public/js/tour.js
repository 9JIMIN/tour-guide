/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable import/prefer-default-export */
import axios from "axios";
import { showAlert } from "./alert";

export const createTour = async (data) => {
  try {
    const res = await axios({
      method: "post",
      url: "/tours",
      data,
    });
    if (res.data.status === "success")
      showAlert("success", "tour created successfully!");
    window.setTimeout(() => {
      location.assign("/");
    }, 1000);
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

export const updateTour = async (data) => {
  try {
    const res = await axios({
      method: "patch",
      url: "/tours",
      data,
    });
    if (res.data.status === "success")
      showAlert("success", "tour updated successfully!");
    window.history.back();
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

export const deleteTour = async (tourId) => {
  try {
    const res = await axios({
      method: "delete",
      url: `/tours/${tourId}`,
    });
    if (res.status === 204) showAlert("success", "tour deleted successfully!");
    window.history.back();
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiOTA5amltaW4iLCJhIjoiY2s5bm93ZjRhMDQyZjNlbXNjamhmMG50ZyJ9.-CBrcxVrXHK3F44amvfj9A";

  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/909jimin/ck9p2kpvr0m361ip3qsfw4pdh",
  });

  //
  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    const el = document.createElement("div");
    el.className = "marker";

    // Add marker
    const popup = new mapboxgl.Popup({ offset: 15 }).setHTML(
      `<h3>Day-${loc.day}</h3><h4>${loc.name}</h4><p>${loc.description}</p>`
    );

    new mapboxgl.Marker({
      element: el,
      anchor: "bottom",
    })
      .setLngLat(loc.coordinates)
      .setPopup(popup)
      .addTo(map);

    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 100,
      bottom: 50,
      left: 80,
      right: 80,
    },
  });
};

export const createMap = () => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiOTA5amltaW4iLCJhIjoiY2s5bm93ZjRhMDQyZjNlbXNjamhmMG50ZyJ9.-CBrcxVrXHK3F44amvfj9A";

  const map = new mapboxgl.Map({
    container: "createMap",
    style: "mapbox://styles/909jimin/ck9p2kpvr0m361ip3qsfw4pdh",
    center: [128.10287709629893, 35.15031455688673],
    zoom: 5,
  });

  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    style: "mapbox://styles/909jimin/ck9npgbpt3dw61ip9hjvy0l88",
  });
  map.addControl(geocoder);

  let i = 1;
  map.on("click", function (e) {
    const coord = [e.lngLat.wrap().lng, e.lngLat.wrap().lat];
    //
    const el = document.createElement("div");
    el.className = "marker";
    new mapboxgl.Marker({
      element: el,
      anchor: "bottom",
    })
      .setLngLat(coord)
      .addTo(map);
    //
    const table = document.querySelector(".place-table");
    table.insertAdjacentHTML(
      "beforeend",
      `<tr><td class='day'><input class='locationDay' type='text' value=${i}></td><td><input class='location' type='text'/></td><td><input class='locationInfo' type='text'/></td></tr>`
    );
    i++;
    const locationEl = document.querySelectorAll(".location");
    locationEl[locationEl.length - 1].dataset.lngLat = coord;
  });
};
