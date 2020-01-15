import {Action, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import {CREATE_USER_MUTATION, ISSUE_TOKEN_MUTATION} from '@/graphql/mutations';
import {apolloClient, token, authUserData} from '@/main';
import router from '@/router';
import {store} from '@/store';
import { GET_AUTH_DATA_MUTATION } from '@/graphql/queries';

export interface AuthState {
    isLoggedIn: boolean;
}

@Module
export default class AuthModule extends VuexModule {
    private data: AuthState = token ? {isLoggedIn: true} : {isLoggedIn: false};
    private authData: object = authUserData ? authUserData : {};

    @Mutation
    public setAuthState(payload: any) {
        this.data.isLoggedIn = payload.isLoggedIn;
    }

    @Mutation
    public setAuthData(payload: any) {
        this.authData = payload.auth;
    }

    @Action
    public login(loginData: any) {
        apolloClient.mutate({
            mutation: ISSUE_TOKEN_MUTATION,
            variables: {
                email: loginData.email,
                password: loginData.password,
            },
        }).then((response) => {
            this.context.commit('setAuthState', {
                isLoggedIn: true,
            });
            localStorage.setItem('auth_token', response.data.issueToken);
            store.dispatch('getAuthData');
            router.push('/');
        }, ({graphQLErrors}) => {
            this.context.dispatch('notify', {
                type: 'error',
                message: graphQLErrors[0].message,
            });
        });
    }

    @Action
    public register(registerData: any) {
        apolloClient.mutate({
            mutation: CREATE_USER_MUTATION,
            variables: {
                email: registerData.email,
                name: registerData.name,
                password: registerData.password,
            },
        }).then((response) => {
            this.context.dispatch('notify', {
                type: 'success',
                message: `Thank you ${response.data.createUser.name} for registration. You can login now!`,
            });
        }, ({graphQLErrors}) => {
            this.context.dispatch('notify', {
                type: 'error',
                message: graphQLErrors[0].message,
            });
        });
    }

    @Action
    public logout() {
        this.context.commit('setAuthState', {
            isLoggedIn: false,
        });
        this.context.commit('setAuthData', {});
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_data');
        router.push('/auth');
    }

    @Action
    public getAuthData() {
        apolloClient.mutate({
            mutation: GET_AUTH_DATA_MUTATION,
        }).then((response) => {
            localStorage.setItem('auth_data', JSON.stringify(response.data.me));
            this.context.commit('setAuthData', {
                auth: response.data.me,
            });
        });
    }
}
