// Fazer login no Google
let isSignedInGoogle;
function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;

    console.log(googleUser.getBasicProfile().getName())
    
    const googleAuth = gapi.auth2.getAuthInstance()
    isSignedInGoogle = googleAuth.isSignedIn.get()
    
    document.location.href = `/signGoogle?id=${id_token}`
}