import {Action, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import {CREATE_USER_MUTATION, ISSUE_TOKEN_MUTATION} from '@/graphql/mutations';
import {apolloClient, token} from '@/main';
import router from '@/router';

export interface AuthState {
    isLoggedIn: boolean;
}

@Module
export default class AuthModule extends VuexModule {
    private data: AuthState = {isLoggedIn: false};

    public get isLoggedIn() {
        return this.data.isLoggedIn;
    }

    @Mutation
    public setAuthState(payload: any) {
        this.data.isLoggedIn = payload.isLoggedIn;
    }

    @Mutation
    public setInitialAuthState() {
        this.data.isLoggedIn = !!token();
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
        localStorage.removeItem('auth_token');
        router.push('/auth');
    }
}
