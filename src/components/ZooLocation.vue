<template>
  <div class="zoo-location">
    <v-card class="mx-auto" max-width="900">
      <v-card-text>
        <div>Location</div>
        <div class="row">
          <div class="col-md-6">
            <div class="text--primary">
              {{ zoo.address.full }}
            </div>
          </div>
          <div class="col-md-6">
            <LMap class="location-map" :zoom="zoom" :center="center">
              <LTileLayer :url="url"></LTileLayer>
              <LMarker :icon="markerIcon" :lat-lng="markerPosition">
              </LMarker>
            </LMap>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import {Zoo} from '@/models/Zoo';
import { LMap, LMarker, LTileLayer} from 'vue2-leaflet';
import {DEFAULT_MAP_ZOOM, MAP_URL} from '@/consts';
import L from 'leaflet';

@Component({
    components: {
        LMap,
        LTileLayer,
        LMarker,
    },
})
export default class ZooLocation extends Vue {
    @Prop() public zoo?: Zoo;
    private zoom = DEFAULT_MAP_ZOOM;
    private url = MAP_URL;
    private center!: number[];
    private markerPosition!: any;
    private markerIcon = L.icon({
        iconUrl: require('@/assets/marker.png'),
        iconSize: [30, 40],
        iconAnchor: [20, 20],
    });

    public created() {
        if (this.zoo) {
            this.markerPosition = L.latLng(this.zoo.location.latitude, this.zoo.location.longitude);
            this.center = [this.zoo.location.latitude, this.zoo.location.longitude];
        }
    }

}
</script>

<style lang="scss" scoped>
  .zoo-location{
    .location-map{
      min-height: 200px;
    }
  }
</style>
