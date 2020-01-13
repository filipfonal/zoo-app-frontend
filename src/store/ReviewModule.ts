import {Action, Module, VuexModule} from 'vuex-module-decorators';
import {POST_REVIEW_MUTATION, DELETE_REVIEW_MUTATION, UPDATE_REVIEW_MUTATION} from '@/graphql/mutations';
import {apolloClient} from '@/main';

@Module
export default class ReviewModule extends VuexModule {
    @Action
    public submitReview(reviewData: any) {
        apolloClient.mutate({
            mutation: POST_REVIEW_MUTATION,
            variables: {
                zooId: reviewData.zooId,
                rating: reviewData.rating,
                content: reviewData.content,
            },
        }).then((response) => {
            this.context.dispatch('notify', {
                type: 'success',
                message: `Thank you for review. Your review will appear soon`,
            });
        }, ({graphQLErrors}) => {
            this.context.dispatch('notify', {
                type: 'error',
                message: graphQLErrors[0].message,
            });
        });
    }

    @Action
    public deleteReview(reviewData: any) {
        apolloClient.mutate({
            mutation: DELETE_REVIEW_MUTATION,
            variables: {
                id: reviewData.id,
            },
        }).then((response) => {
            this.context.dispatch('notify', {
                type: 'success',
                message: `Your review has been deleted. It will disappear soon.`,
            });
        }, ({graphQLErrors}) => {
            this.context.dispatch('notify', {
                type: 'error',
                message: graphQLErrors[0].message,
            });
        });
    }

    @Action
    public updateReview(reviewData: any) {
        apolloClient.mutate({
            mutation: UPDATE_REVIEW_MUTATION,
            variables: {
                id: reviewData.id,
                rating: reviewData.rating,
                content: reviewData.content,
            },
        }).then((response) => {
            this.context.dispatch('notify', {
                type: 'success',
                message: `Your review was changed. It will update soon.`,
            });
        }, ({graphQLErrors}) => {
            this.context.dispatch('notify', {
                type: 'error',
                message: graphQLErrors[0].message,
            });
        });
    }
}
