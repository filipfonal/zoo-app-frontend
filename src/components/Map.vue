<template>

</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import {Zoo} from "@/models/Zoo";

@Component
export default class Map extends Vue {
    @Prop() public zoos?: Zoo[];
}
</script>

<style scoped>

</style>
