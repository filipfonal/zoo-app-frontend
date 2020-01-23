<template>
    <div class="wrapper">
        <v-card class="login-card" min-width="350">
            <v-card-text>
                <v-tabs fixed-tabs background-color="amber" dark v-model="activeTab">
                    <v-tab>
                        Login
                    </v-tab>
                    <v-tab>
                        Registration
                    </v-tab>
                </v-tabs>
                <v-tabs-items v-model="activeTab">
                    <v-tab-item class="tab-item">
                        <v-form ref="form" lazy-validation>

                            <v-text-field v-model="email" type="email" label="E-mail" required></v-text-field>

                            <v-text-field v-model="password" type="password" label="Password" required></v-text-field>

                            <v-btn color="amber" class="login-button" @click="attemptLogin()">Login</v-btn>

                        </v-form>
                    </v-tab-item>
                    <v-tab-item class="tab-item">
                        <v-form ref="form" lazy-validation>

                            <v-text-field v-model="email" type="email" label="E-mail" required></v-text-field>

                            <v-text-field v-model="name" type="text" label="Name" required></v-text-field>

                            <v-text-field v-model="password" type="password" label="Password" required></v-text-field>

                            <v-btn color="amber" class="register-button" @click="attemptRegister()">Register</v-btn>

                        </v-form>
                    </v-tab-item>
                </v-tabs-items>
            </v-card-text>
        </v-card>
    </div>
</template>

<script lang='ts'>
import Component from 'vue-class-component';
import Vue from 'vue';
import {store} from '@/store';

@Component
export default class Auth extends Vue {
    private email = '';
    private name = '';
    private password = '';
    private activeTab = 0;

    private attemptLogin() {
        if (!this.isValidForLogin()) {
            this.invalidFormAlert();
            return;
        }

        this.$store.dispatch('login', {
            email: this.email,
            password: this.password,
        }).then(() => {
            this.$store.dispatch('getAuthData');
            this.clearData();
        });
    }

    private attemptRegister() {
        if (!this.isValidForRegistration()) {
            this.invalidFormAlert();
            return;
        }

        this.$store.dispatch('register', {
            email: this.email,
            name: this.name,
            password: this.password,
        }).then(() => {
            this.clearData();
        });
    }

    private clearData() {
        this.email = '';
        this.name = '';
        this.password = '';
    }

    private invalidFormAlert() {
        this.$store.dispatch('notify', {
            type: 'warning',
            message: 'Please fill up all fields',
        });
    }

    private isValidForLogin(): boolean {
        return this.email !== '' && this.password !== '';
    }

    private isValidForRegistration(): boolean {
        return this.email !== '' && this.name !== '' && this.password !== '';
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

        .login-button, .register-button{
            width: 100%;
            color: #fff;
        }
    }
    .tab-item{
        padding: 10px;
    }
</style>
