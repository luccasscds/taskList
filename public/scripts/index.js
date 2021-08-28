function date() {
    const now = new Date();
    const hours = now.getHours();
    const saudacao = document.querySelector('#saudacao');
    const sufixo = "seja bem-vindo!";

    if(hours >= 6 && hours <= 11) saudacao.innerHTML = `Bom dia, ${sufixo}`;

    if(hours >= 12 && hours <= 17) saudacao.innerHTML = `Boa tarde, ${sufixo}`;

    if(hours >= 18 && hours <= 23 || hours >= 0 && hours <= 5) saudacao.innerHTML = `Boa noite, ${sufixo}`;
};
date();