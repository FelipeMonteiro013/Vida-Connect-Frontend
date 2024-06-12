
var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");
var body = document.querySelector("body");

btnSignin.addEventListener("click", function (){
    body.className = "sign-in-js";


});

btnSignup.addEventListener("click", function (){
    body.className = "sign-up-js";


})


document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

  
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Supondo que a validação seja bem-sucedida
    if (email === 'email' && password === 'senha') { // Exemplo simples de validação
        // Redireciona para a tela inicial
        window.location.href = 'inicial.html'; // Substitua 'tela_inicial.html' pelo caminho da sua página inicial
    } else {
        alert('Usuário ou senha incorretos');
    }
});


