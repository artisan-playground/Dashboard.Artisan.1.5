<template>
  <div>
    <div>
      <a-modal
        :visible="visibleSuccess"
        :confirm-loading="confirmLoading"
        @cancel="handleCancel"
      >
        <div class="Vclockinsuccess">
          <img id="clockinpic" alt="clockinpic" src="../assets/clockinsc.png" />

          <h1>Check in</h1>

          <div>
            <p class="text1">
              Success is a lousy teacher. I seduces smart people into thinking
              they can't lose.
            </p>
            <p class="text2">Bill Gates</p>
          </div>
        </div>
      </a-modal>

      <a-modal
        :visible="visibleFailed"
        :confirm-loading="confirmLoading"
        @cancel="handleCancel"
      >
        <div class="Vclockinfail">
          <img id="checkinf" alt="checkinf" src="../assets/clockinfail.png" />
          <div>
            <p class="alert">นั่นแน่ จะลักไก่เหรอ!!!!! เราเห็นน้า</p>
          </div>
          <div>
            <button class="conbutton" @click="handleCancel">Continue</button>
          </div>
        </div>
      </a-modal>
    </div>
    <div id="mapContainer" class="basemap"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { defineComponent } from "vue";
import axios from "axios";
import mapboxgl from "mapbox-gl";

export default defineComponent({
  name: "Googlemap",
  data: () => ({
    calHeigth: 0 as number,
    calWidth: 0 as number,
    visibleFailed: false,
    visibleSuccess: false,
    interval: undefined as any,
    counter: 0 as number,
    positionUser: {
      lat: 0 as number,
      lng: 0 as number,
    },
    positionCompany: {
      lat: 18.78593940199299,
      lng: 98.96717131662662,
    },
  }),
  methods: {
    getLocation() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.positionUser.lat = position.coords.latitude;
        this.positionUser.lng = position.coords.longitude;
        this.initMap();
      });
    },
    initMap() {
      const metersToPixelsAtMaxZoom = (meters: number, latitude: number) =>
        meters / 0.075 / Math.cos((latitude * Math.PI) / 180);

      // const positionUser = {
      //   lngUser: 98.96627524143693,
      //   latUser: 18.78576185133086,
      // };
      const positionUser = {
        lngUser: this.positionUser.lng,
        latUser: this.positionUser.lat,
      };

      const positionCompany = {
        lngCompany: this.positionCompany.lng,
        latCompany: this.positionCompany.lat,
      };

      mapboxgl.accessToken =
        "pk.eyJ1IjoicG9uZ3BpY2hhdG5vb2siLCJhIjoiY2tqamYxdzRvMXEybDJ5cGd0c2h3N2FxciJ9.kOPbhMOoqifKk3Vw9FmqmA";
      const map = new mapboxgl.Map({
        container: "mapContainer",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [positionCompany.lngCompany, positionCompany.latCompany],
        zoom: 16,
      });

      const markerCompany = new mapboxgl.Marker({
        color: "#000",
      })
        .setLngLat([positionCompany.lngCompany, positionCompany.latCompany])
        .addTo(map);

      const markerUser = new mapboxgl.Marker({
        color: "#87D775",
      })
        .setLngLat([positionUser.lngUser, positionUser.latUser])
        .addTo(map);

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
                  coordinates: [
                    positionCompany.lngCompany,
                    positionCompany.latCompany,
                  ],
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
                [positionCompany.lngCompany, positionCompany.latCompany],
                [positionUser.lngUser, positionUser.latUser],
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
              stops: [
                [0, 0],
                [20, metersToPixelsAtMaxZoom(100, 18.78593940199299)],
              ],
              base: 2,
            },
            "circle-color": "#FF0000",
            "circle-stroke-width": 1,
            "circle-stroke-color": "#00bf7c",
            "circle-opacity": 0.4,
          },
          filter: ["==", "modelId", 1],
        });
      });

      const nav = new mapboxgl.NavigationControl();
      map.addControl(nav, "top-right");
      const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      });
      map.addControl(geolocate, "top-right");
    },
    calculateDistance() {
      const lat1 = this.positionUser.lat;
      const lat2 = this.positionCompany.lat;
      const lon1 = this.positionUser.lng;
      const lon2 = this.positionCompany.lng;
      const R = 6371e3; // metres
      const rlat1 = (lat1 * Math.PI) / 180; // φ1
      const rlat2 = (lat2 * Math.PI) / 180; //φ2
      const rlat12 = ((lat2 - lat1) * Math.PI) / 180; //Δφ
      const lonPie = ((lon2 - lon1) * Math.PI) / 180; //Δλ

      const a =
        Math.sin(rlat12 / 2) * Math.sin(rlat12 / 2) +
        Math.cos(rlat1) *
          Math.cos(rlat2) *
          Math.sin(lonPie / 2) *
          Math.sin(lonPie / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const dist = R * c; // in metres

      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);

      if (dist < 100) {
        this.visibleSuccess = true;
        const result = {
          id: `${urlParams.get("id")}`,
          distance: Math.ceil(dist),
          massage: "จะลักไก่หรอออ อย่านะ จุบุ",
          responeCode: 204,
        };

        axios
          .post("http://192.168.1.1:8100/api/clockin", result)
          .then((response) => {
            console.log("response: ", response);
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        this.visibleFailed = true;
      }
    },

    handleCancel(e: object) {
      this.visibleFailed = false;
      this.visibleSuccess = false;
    },
    setIntervalClockin() {
      this.interval = setInterval(() => {
        this.counter++;
        if (this.counter === 4) {
          this.calculateDistance();
          clearInterval(this.interval);
        } else {
          this.getLocation();
        }
      }, 1500);
    },
  },

  mounted() {
    this.calHeigth = window.innerHeight;
    this.calWidth = window.innerWidth;
    this.getLocation();
    setTimeout(() => this.setIntervalClockin(), 2000);
  },
});
</script>

<style scoped>
.basemap {
  width: 100%;
  height: 100vh;
}
</style>
