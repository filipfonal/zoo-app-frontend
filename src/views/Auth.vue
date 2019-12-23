<template>
    <div class="wrapper">
        <v-card class="login-card" min-width="350">
            <v-card-text>
                <v-form ref="form" lazy-validation>

                    <v-text-field v-model="email" type="email" label="E-mail" required></v-text-field>

                    <v-text-field v-model="password" type="password" label="Password" required></v-text-field>

                    <v-btn color="amber" class="login-button" @click="attemptLogin()">Login</v-btn>

                </v-form>
            </v-card-text>
        </v-card>
    </div>
</template>

<script lang='ts'>
import Component from 'vue-class-component';
import Vue from 'vue';

@Component
export default class Auth extends Vue {
    private email = '';
    private password = '';

    private attemptLogin() {
        this.$store.dispatch('login', {
            email: this.email,
            password: this.password,
        });
    }
}
</script>

<style scoped lang="scss">
    .wrapper{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .login-button{
            width: 100%;
            color: #fff;
        }
    }
</style>
