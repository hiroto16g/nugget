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
    mutations: {
        click_submit(state) {
            state.submitting = true
        },
        end_submit(state) {
            state.submitting = false    // ログインのチェックが終わったら実行してください
        }
    }
}