
var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");
var body = document.querySelector("body");

const baseURL = "http://ec2-44-223-23-150.compute-1.amazonaws.com:3000"

localStorage.clear()


btnSignin.addEventListener("click", function () {
    body.className = "sign-in-js";
});

btnSignup.addEventListener("click", function () {
    body.className = "sign-up-js";
})


var formLogin = document.getElementById('loginform').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    var email = document.getElementById('loginEmail').value;
    var password = document.getElementById('loginPassword').value;

    var data = {
        email: email,
        password: password
    }
    login(data)
});


const login = async (data) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    await fetch(`${baseURL}/employee/login`, requestOptions).then(response => response.json()).then(data => {     
        if (data?._id) { 
            localStorage.setItem("loggedUserId", data?._id)
            window.location.href = 'inicial.html'; 
        } else {
            alert('Usuário ou senha incorretos');
        }
    }).catch(error => console.error('Ocorreu um erro:', error))
}

// ************************ Cadastro **************************

var formCadastro = document.getElementById('formCadastro').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    var email = document.getElementById('email').value;
    var password = document.getElementById('senha').value;
    var nome = document.getElementById('nome').value;
    var telefone = document.getElementById('telefone').value;

    var data = {
        name: nome,
        phone: telefone,
        email: email,
        password: password,
        status: true
    }
    register(data)
});

const register = async (data) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    await fetch(`${baseURL}/employee`, requestOptions).then(response => response.json()).then(data => {     
        if (data?._id) {
            alert("Funcionário cadastrado com sucesso!")
            body.className = "sign-in-js";
        }
    }).catch(error => console.error('Ocorreu um erro:', error))
}
