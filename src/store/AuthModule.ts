import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {ISSUE_TOKEN_MUTATION} from "@/graphql/mutations";
import {apolloClient, token} from "@/main";
import router from "@/router";

export interface AuthState {
    isLoggedIn: boolean;
    token: string;
}

@Module
export default class AuthModule extends VuexModule {
    data: AuthState = token ?
        {isLoggedIn: true, token: token} :
        {isLoggedIn: false, token: ''};

    get tokenValue() {
        return this.data.token;
    }

    @Mutation
    loginSuccess(payload: any) {
        this.data.isLoggedIn = payload.isLoggedIn;
        this.data.token = payload.token;
        localStorage.setItem('auth_token', this.data.token);
    }

    @Action
    login(loginData: any) {
        apolloClient.mutate({
            mutation: ISSUE_TOKEN_MUTATION,
            variables: {
                email: loginData.email,
                password: loginData.password
            }
        }).then(response => {
            this.context.commit('loginSuccess', {
                isLoggedIn: true,
                token: response.data.issueToken
            });
            router.push('/');
        })
    }
}
