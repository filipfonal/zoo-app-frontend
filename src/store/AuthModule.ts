import {Action, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import {ISSUE_TOKEN_MUTATION} from '@/graphql/mutations';
import {apolloClient, token} from '@/main';
import router from '@/router';

export interface AuthState {
    isLoggedIn: boolean;
}

@Module
export default class AuthModule extends VuexModule {
    private data: AuthState = token ? {isLoggedIn: true} : {isLoggedIn: false};

    @Mutation
    public loginSuccess(payload: any) {
        this.data.isLoggedIn = payload.isLoggedIn;
        localStorage.setItem('auth_token', payload.token);
        router.push('/');
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
            this.context.commit('loginSuccess', {
                isLoggedIn: true,
                token: response.data.issueToken,
            });
        }, ({graphQLErrors}) => {
            this.context.dispatch('notify', {
                type: 'error',
                message: graphQLErrors[0].message,
            });
        });
    }
}
