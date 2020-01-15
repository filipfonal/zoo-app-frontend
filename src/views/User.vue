<template>
  <div class="user-view" v-if="user">
    <UserHeader :user="user"/>
    <UserReviews :user="user"/>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import {apolloClient} from '@/main';
import {GET_SINGLE_USER} from '@/graphql/queries';
import UserHeader from '@/components/UserHeader.vue';
import UserReviews from '@/components/UserReviews.vue';

@Component({
    components: {
        UserHeader,
        UserReviews,
    },
})
export default class User extends Vue {
    private user: User | null = null;

    public created(): void {
        apolloClient.query({
            query: GET_SINGLE_USER,
            variables: {
                id: this.$route.params.id,
            },
        }).then((response) => {
            this.user = response.data.user;
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
