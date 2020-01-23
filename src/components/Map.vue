<template>
  <LMap :zoom="zoom" :center="center" v-if="showMap">
    <LTileLayer :url="url"></LTileLayer>
    <LMarker v-for="marker in markers" :icon="markerIcon"  :key="marker.id" :lat-lng="marker.latlng">
      <LPopup>
        <div class="row">
          <div class="col-md-12">
            <h4>{{ marker.name }}</h4>
            <star-rating
                    :rating="marker.rating"
                    :increment="0.1"
                    read-only
                    :show-rating="false"
                    :star-size="15"></star-rating>
          </div>
          <div class="col-md-12">
            <img :src="marker.logo" alt="">
          </div>
          <div class="col-md-12">
            <v-btn class="zoo-select-btn" color="amber" dark @click="selectZoo(marker.id)">
              Wybierz
            </v-btn>
          </div>
        </div>
      </LPopup>
    </LMarker>
  </LMap>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import {Zoo} from '@/models/Zoo';
import {LMap, LTileLayer, LMarker, LPopup} from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import {DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM, MAP_URL} from '@/consts';
import L from 'leaflet';

@Component({
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LPopup,
    },
})
export default class Map extends Vue {
    @Prop() public zoos?: Zoo[];
    @Prop() public showMap = false;
    private center = DEFAULT_MAP_CENTER;
    private zoom = DEFAULT_MAP_ZOOM;
    private url = MAP_URL;
    private markers: any[] = [];
    private markerIcon = L.icon({
        iconUrl: require('@/assets/marker.png'),
        iconSize: [30, 40],
        iconAnchor: [20, 20],
    });

    public created() {
        this.$watch('zoos', () => {
            if (this.zoos && this.zoos.length > 0) {
                this.center = [this.zoos[0].location.latitude, this.zoos[0].location.longitude];

                this.markers = [];

                this.zoos.forEach((zoo) => {
                    this.markers.push({
                        id: zoo.id,
                        latlng: L.latLng(zoo.location.latitude, zoo.location.longitude),
                        name: zoo.name,
                        logo: zoo.logo,
                        rating: zoo.rating,
                    });
                });
            }
        });
    }

    private selectZoo(id: number) {
        this.$emit('selectedZoo', id);
    }
}
</script>

<style scoped>
.zoo-select-btn{
  width: 100%;
}
</style>
