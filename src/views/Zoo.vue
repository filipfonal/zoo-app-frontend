<template>
  <ZooHeader :zoo="zoo"/>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import {apolloClient} from "@/main";
import {GET_SINGLE_ZOO} from "@/graphql/queries";
import ZooHeader from "@/components/ZooHeader.vue";

@Component({
    components:{
        ZooHeader
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

</style>
