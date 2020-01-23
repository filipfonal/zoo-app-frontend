import {Action, Module, VuexModule} from 'vuex-module-decorators';
import {ADD_FAVOURITE_MUTATION} from '@/graphql/mutations';
import {apolloClient} from '@/main';

@Module
export default class FavouritesModule extends VuexModule {
    @Action
    public addFavourite(zooId: string) {
        apolloClient.mutate({
            mutation: ADD_FAVOURITE_MUTATION,
            variables: {zooId},
        }).then((response) => {
            this.context.dispatch('notify', {
                type: 'success',
                message: `Zoo was marked as favourite`,
            });
        }, ({graphQLErrors}) => {
            this.context.dispatch('notify', {
                type: 'error',
                message: graphQLErrors[0].message,
            });
        });
    }
}
