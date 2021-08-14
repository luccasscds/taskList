// Fazer login no Google
function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    // enviar o token
    sendForm(id_token)
}

function sendForm(id_token) {
    const form = document.createElement("form");
    form.method = "POST"
    form.action = `/signGoogle?token=${id_token}`
    document.body.appendChild(form)
    form.submit()
}

function signGitHib() {
    const client_id = 'a304031e4c1e9ce53f7'
    const url = `https://github.com/login/oauth/authorize`
    const options = {
        method: "GET",
        body : new URLSearchParams({
            client_id : client_id
        })
    }

    fetch(url, options)
    .then( res => res.json())
    .then(res => {
        console.log(res)
    })
    .catch( err => {
        console.log('error')
    })
}