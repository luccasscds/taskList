
// Fazer login no Google
function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;
    const googleAuth = gapi.auth2.getAuthInstance()
    const profile = googleUser.getBasicProfile()

    console.log(profile.getName())
}

// Sair da conta
function signOut() {
    const auth2 = gapi.auth2.getAuthInstance();

    auth2.signOut().then(function () {
        alert('Você desconectou da sua conta!')
    })
}

function url() {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=911878798196-11jbdiam8s64rkcpkjb31061mqa2vrrj.apps.googleusercontent.com&scope=openid%20profile%20email&redirect_uri=http://localhost:3000&nonce=0394852-3190485-2490358`

    window.location.href = url
}