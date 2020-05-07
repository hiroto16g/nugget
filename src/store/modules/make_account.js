export default {
    namespaced: true,
    
    state: {
        is_error: false,
        error_texts: {
            name: '表示名は1文字以上にしてください',
            confirm: 'パスワードが一致していません',
            mail: '無効なメールアドレスです'
        },
        inputs: {
            name: '',
            password: '',
            confirm: '',
            mail_address: ''
        }
    }
}