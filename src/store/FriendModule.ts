import {Action, Module, VuexModule} from 'vuex-module-decorators';
import {ADD_FRIEND_MUTATION, REMOVE_FRIEND_MUTATION} from '@/graphql/mutations';
import {apolloClient} from '@/main';

@Module
export default class Friend extends VuexModule {
    @Action
    public addFriend(email: string) {
        apolloClient.mutate({
            mutation: ADD_FRIEND_MUTATION,
            variables: {email},
        }).then((response) => {
            this.context.dispatch('notify', {
                type: 'success',
                message: `Friend was added`,
            });
        }, ({graphQLErrors}) => {
            this.context.dispatch('notify', {
                type: 'error',
                message: graphQLErrors[0].message,
            });
        });
    }

    @Action
    public removeFriend(email: string) {
        apolloClient.mutate({
            mutation: REMOVE_FRIEND_MUTATION,
            variables: {email},
        }).then((response) => {
            this.context.dispatch('notify', {
                type: 'success',
                message: `Friend was removed`,
            });
        }, ({graphQLErrors}) => {
            this.context.dispatch('notify', {
                type: 'error',
                message: graphQLErrors[0].message,
            });
        });
    }
}
