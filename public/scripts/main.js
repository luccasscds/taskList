let isSignedInGoogle;

// Fazer login no Google
function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;
    const googleAuth = gapi.auth2.getAuthInstance()
    const profile = googleUser.getBasicProfile()

    console.log(profile.getName())
    isSignedInGoogle = googleAuth.isSignedIn.get()
}

function sendRequest() {
    fetch("/test/post?id=12", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(),
    })
    // .then( response => response.json() )
    // .then((json) => {
    //     console.log("Success:", json);
    // })
    // // .catch((error) => {
    // //     console.error("Error:", error);
    // // });
}

// Sair da conta
function signOut() {
    let auth2 = gapi.auth2.getAuthInstance();
    isSignedInGoogle = auth2.isSignedIn.Sd

    auth2.signOut().then(function () {
        alert('Você desconectou da sua conta!')
    })
}