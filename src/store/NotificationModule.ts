import {Action, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import {Notification} from '@/models/Notification';

@Module
export default class NotificationModule extends VuexModule {
    private data: Notification = {message: undefined, type: undefined};

    get notification() {
        return this.data;
    }

    @Mutation
    public setNotification(payload: Notification) {
        this.data.type = payload.type;
        this.data.message = payload.message;
    }

    @Action
    public notify(payload: Notification) {
        this.context.commit('setNotification', {
            type: payload.type,
            message: payload.message,
        });

        setTimeout(() => {
            this.context.commit('setNotification', {
                type: undefined,
                message: undefined,
            });
        }, 2000);
    }
}
