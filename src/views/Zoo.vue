<template>
  <div class="zoo-view" v-if="zoo">
    <ZooHeader :zoo="zoo"/>
    <ZooDescription class="card" :zoo="zoo"/>
    <ZooLocation class="card" :zoo="zoo" />
    <ZooRecentReviews class="card" :zoo="zoo" />
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import {apolloClient} from "@/main";
import {GET_SINGLE_ZOO} from "@/graphql/queries";
import ZooHeader from "@/components/ZooHeader.vue";
import ZooDescription from "@/components/ZooDescription.vue";
import ZooLocation from "@/components/ZooLocation.vue";
import ZooRecentReviews from "@/components/ZooRecentReviews.vue";

@Component({
    components:{
        ZooHeader,
        ZooDescription,
        ZooLocation,
        ZooRecentReviews
    }
})
export default class Zoo extends Vue {
    private zoo: Zoo | null = null;

    created() {
        apolloClient.query({
            query: GET_SINGLE_ZOO,
            variables: {
                id: this.$route.params.id,
            },
        }).then((response) => {
            this.zoo = response.data.zoo;
        }, ({graphQLErrors}) => {
            this.$store.dispatch('notify', {
                type: 'error',
                message: graphQLErrors[0].message,
            });
            this.$router.push('/');
        });
    }

}
</script>

<style lang="scss" scoped>
  .card{
    padding-bottom: 50px;
  }
</style>
