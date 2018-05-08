require('./bootstrap');

window.Vue = require('vue');

import Vue from 'vue'
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll);

Vue.component('example-component', require('./components/ExampleComponent.vue'));
Vue.component('message', require('./components/message.vue'));

const app = new Vue({
    el: '#app',
    data: {
        message: '',
        chat: {
            message: [],
            user: [],
            color: [],
            typing: '',
            time: []
        }
    },
    methods: {
        send() {
            if (this.message.length != 0) {
                axios.post('/send', {
                    message: this.message
                }).then(response => {
                    this.chat.message.push(this.message);
                    this.chat.user.push('you');
                    this.chat.color.push('success');
                    this.chat.time.push(this.getTime());
                    this.message = '';
                }).catch(error => {
                    console.log(error);
                });
            }
        },
        getTime() {
            let time = new Date();
            return time.getHours() + ':' + time.getMinutes();
        }
    },
    watch: {
        message() {
            Echo.private('chat')
                .whisper('typing', {
                    name: this.message
                });
        }
    },
    mounted() {
        Echo.private('chat')
            .listen('ChatEvent', (e) => {
                this.chat.message.push(e.message);
                this.chat.user.push(e.user);
                this.chat.color.push('warning');
                this.chat.time.push(this.getTime());
            }).listenForWhisper('typing', (e) => {
            if (e.name != '') {
                this.chat.typing = 'typing...';
            }else {
                this.chat.typing = '';
            }
        })
    }
});
