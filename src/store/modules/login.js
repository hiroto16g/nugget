import axios from 'axios'

/* eslint-disable no-console */

export default {
    namespaced: true,

    state: {
        is_error: true,
        error_text: '',
        inputs: {
            password: '',
            mail_address: ''
        },
        submitting: false
    },
    actions:{
        //ログイン
        click_submit(context, inputs){
            //POSTデータ
            var formData = new FormData();
            formData.append('Email', inputs.mail_address);
            formData.append('Password', inputs.password);
            //ログイン
            axios
            .post('http://localhost:8080/login-json', formData)
            .then(function (response) {
                var payload = {
                    data:response.data,
                }
                //
                context.commit('click_submit', payload);

            });
        }
    },
    mutations: {
        click_submit(state,payload) {
            if(this.state.config.RUN_SYSTEM_MODE == this.state.config.SYSTEM_MODE_BOTH){
                //統合モード
                var user = payload.data.user;
                var message = payload.data.message;
                if(user != null){
                    //ログイン成功

                    var userInfo = {
                        log_in: true,
                        name: user.username,
                        id: user.userid,
                        image: user.icon,
                        bio: user.selfIntro,
                        mail_address: user.email,
                    };
                    this.state.userInfo = userInfo;
                    
                    state.submitting = true
                }else{
                    //ログイン失敗
                    //state.submitting = true
                }
                this.error_text = message;
            }else{
                //その他
                state.submitting = true
            }
        },
        end_submit(state) {
            state.submitting = false    // ログインのチェックが終わったら実行してください
        }
    }
}