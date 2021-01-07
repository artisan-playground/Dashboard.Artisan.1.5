<template>
  <div>
    <div >
      <a-modal
        :visible="visible"
        :confirm-loading="confirmLoading"
        @cancel="handleCancel"
      >
        <div v-if="approveClockin === 'approved'" class="Vclockinsuccess">
          <div style="width:100%">
            <img id="clockinpic" alt="clockinpic" src="../assets/clockinsc.png" style="width: initial;" />
          </div>
          
          <div style="text-align:center; width: 100%;">
            <h1>Check in</h1>
            <div >
              <div v-if="content === 0">
                <p class="content1" >
                Success is a lousy teacher. I seduces smart people into thinking
                they can't lose.
              </p>
              <p class="content2">Bill Gates</p>
              </div>
              
              <div v-else-if="content === 1">
                <p class="content1" >
                The only way to do great work is to love what you do.
              </p>
              <p class="content2">Steve Jobs</p>
              </div>
              
            </div>
          </div>
        </div>
        <div v-else-if="approveClockin === 'notapproved'" class="Vclockinfail">
          <div style="width:100%">
            <img id="checkinf" alt="checkinf" src="../assets/clockinfail.png" style="width: initial;" />
          </div>
          
          <div style="text-align:center;">
            <div style="padding: 15px;">
              <p class="alert-content">นั่นแน่ จะลักไก่เหรอ!!!!! เราเห็นน้า</p>
            </div>
            <div>
              <button class="content-button" @click="handleCancel">Continue</button>
            </div>
          </div>
          
        </div>

      </a-modal>


    </div>
    <div id="mapContainer" class="basemap" :style="`height:${calHeigth}px !important`"></div>
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
    approveClockin: "" as string,
    visible: false,
    interval: undefined as any,
    counter: 0 as number,
    content:0 as number,
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
        color: "#E10101",
      })
        .setLngLat([positionCompany.lngCompany, positionCompany.latCompany])
        .addTo(map);

       const trainStationIcon = document.createElement('div');
        trainStationIcon.style.width = '55px';
        trainStationIcon.style.height = '55px';
        trainStationIcon.style.backgroundImage = "url(https://img.icons8.com/plasticine/50/000000/street-view.png)";


      const markerUser = new mapboxgl.Marker(trainStationIcon,{
        anchor: 'bottom',
        offset: [0, 6]
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
            "line-width": 3,
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
            "circle-opacity": 0.2,
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
        this.approveClockin = "approved";
        const result = {
          id: `${urlParams.get("id")}`,
          distance: Math.ceil(dist),
          responeCode: 204,
        };

        this.content = Math.floor(Math.random() * 2);

        axios
          .post("http://192.168.1.18:8100/api/clockin", result)
          .then((response) => {
            console.log("response: ", response);
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        this.approveClockin = "notapproved";
      }
      this.notify()
    },
    notify(){
      this.visible = true;
    },

    handleCancel(e: object) {
      this.visible = false;

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
    setTimeout(() => this.setIntervalClockin(), 1500);
  },
});
</script>

<style scoped>
@font-face {
  font-family: Anuphan;
  src: url('../fonts/Anuphan-Regular.woff') format('woff');
}

body,html{
  font-family: 'Anuphan', sans-serif;
}
.Vclockinsuccess, .Vclockinfail{
  height: fit-content;
  width: fit-content;
  padding: 5px;
  width: 100%;
  text-align: center;
  font-family: 'Anuphan', sans-serif;

}
.alert-content{
  
  font-weight: bold;
}
.content-button{

  width: 35%;
  font-size: inherit;
  padding: 5px 10px;
  background: none;
  border: 1px solid #0036C7;
  box-sizing: border-box;
  color: #105EFB;
  border-radius: 2px;
}



</style>
