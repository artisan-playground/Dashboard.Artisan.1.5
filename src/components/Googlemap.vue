<template>
  <div>
    <p>{{position}}</p>
    <div id="mapContainer" class="basemap"></div>

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import mapboxgl from "mapbox-gl";

export default {
  name: "Googlemap",
  data: () => ({
    position: 0 as number
  }),


  mounted() {
    console.log(this.position)
 
    mapboxgl.accessToken =
      "pk.eyJ1IjoicG9uZ3BpY2hhdG5vb2siLCJhIjoiY2tqamYxdzRvMXEybDJ5cGd0c2h3N2FxciJ9.kOPbhMOoqifKk3Vw9FmqmA";
    const map = new mapboxgl.Map({
      container: "mapContainer",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [98.96717131662662, 18.78593940199299],
      zoom: 15,
    });
    const marker = new mapboxgl.Marker({
      color: "#000",
    })
      .setLngLat([98.96717131662662, 18.78593940199299])
      .addTo(map);
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });
    map.addControl(geolocate, "top-right");
    map.on("style.load", function(e) {
      map.addSource("markers", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [98.96717131662662, 18.78593940199299],
              },
              properties: {
                modelId: 1,
              },
            },
          ],
        },
      });
      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [
              [98.96717131662662, 18.78593940199299],
              [98.95863337628816, 18.781689624310964],
            ],
          },
        },
      });
      map.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#888",
          "line-width": 5,
        },
      });
      map.addLayer({
        id: "circles1",
        source: "markers",
        type: "circle",

        paint: {
          "circle-radius": {
            base: 1.75,
            stops: [
              [12, 2],
              [22, 180],
            ],
            
          },
          "circle-color": "#FF0000",
          "circle-stroke-width": 1,
          "circle-stroke-color": "#00bf7c",
          "circle-opacity": 0.4,
        },
        filter: ["==", "modelId", 1],
      });
    });
  },
};
</script>

<style scoped>
.basemap {
  width: 100%;
  height: 100vh;
}
</style>
