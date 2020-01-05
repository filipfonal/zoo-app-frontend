import {Action, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import {apolloClient} from '@/main';
import {FIND_CITIES_QUERY, FIND_NEARBY_ZOOS, GET_SINGLE_ZOO} from '@/graphql/queries';
import {ZooSearchForm} from '@/models/ZooSearchForm';
import {City} from '@/models/City';
import {Zoo} from '@/models/Zoo';
import {SearchState} from '@/models/SearchState';

@Module
export default class SearchModule extends VuexModule {
    private data: SearchState = {
        cities: [],
        zoos: [],
    };

    get cities(): City[] {
        return this.data.cities;
    }

    get zoos(): Zoo[] {
        return this.data.zoos;
    }

    @Mutation
    public setCityState(payload: any) {
        this.data.cities = payload.cities;
    }

    @Mutation
    public setZoosState(payload: any) {
        this.data.zoos = payload.zoos;
    }

    @Action
    public findCities(value: string) {
        apolloClient.query({
            query: FIND_CITIES_QUERY,
            variables: {
                query: value,
            },
        }).then((response) => {
            this.context.commit('setCityState', {
                cities: response.data.findCities,
            });
        }, ({graphQLErrors}) => {
            this.context.dispatch('notify', {
                type: 'error',
                message: graphQLErrors[0].message,
            });
        });
    }

    @Action
    public findNearbyZoos(searchFormData: ZooSearchForm) {
        apolloClient.query({
            query: FIND_NEARBY_ZOOS,
            variables: {
                longitude: searchFormData.longitude,
                latitude: searchFormData.latitude,
                range: searchFormData.range,
            },
        }).then((response) => {
            this.context.commit('setZoosState', {
                zoos: response.data.findNearbyZoos,
            });
        }, ({graphQLErrors}) => {
            this.context.dispatch('notify', {
                type: 'error',
                message: graphQLErrors[0].message,
            });
        });
    }
}
