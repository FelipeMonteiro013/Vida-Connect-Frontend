const baseURL = "http://ec2-44-223-23-150.compute-1.amazonaws.com:3000"



if (!localStorage.getItem("loggedUserId")) {
    window.location.href = 'index.html';
}

//Inicio cadastro

var formElement = document.getElementById("patientTable");

// Adicionando um ouvinte de eventos para o evento "submit" do formulário
formElement.addEventListener("submit", function (event) {
    // Prevenir o envio padrão do formulário
    event.preventDefault();

    var nome = document.getElementById("namePatient").value
    var email = document.getElementById("emailPatient").value
    var dataDeNascimento = document.getElementById("patDataNascimento").value
    var senha = document.getElementById("patientPassword").value
    var documento = document.getElementById("patientDocument").value

    if (nome, email, dataDeNascimento, senha, documento){
        var data = {
            name: nome,
            email: email,
            dt_nasc: dataDeNascimento,
            password: senha,
            document: documento,

        }
        cadastrarPaciente(data)

    }

});

const cadastrarPaciente = async (data) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    await fetch(`${baseURL}/patient`, requestOptions).then(response => response.json()).then(data => {
        window.location.href = 'info.html';

    }).catch(error => console.error('Ocorreu um erro:', error))

}



// ****************************************************** MEDICOS ************************************************

var listaDeClinicas = [];
var listaDeEspecialidades = [];



var doctorForm = document.getElementById("doctorTable");


doctorForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var nome = document.getElementById("doctorName").value
    var crm = document.getElementById("crm").value
    var especialidade = document.getElementById("specialityName").value
    var clinica = document.getElementById("clinicLocal").value
    var telefone = document.getElementById("telDoctor").value
    var email = document.getElementById("emailDoctor").value
    console.log("testando")

    if (nome, crm, especialidade, clinica, telefone, email){
        var data = {
            name: nome,
            crm: crm,
            specialty_id: especialidade,
            clinic_id: clinica,
            phone: telefone,
            email: email,
            status: true
        }
        cadastrarMedico(data)



    }

})

const cadastrarMedico = async (data) => {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    await fetch(`${baseURL}/doctor`, requestOptions).then(response => response.json()).then(data => {
        window.location.href = 'info.html';
    }).catch(error => console.error('Ocorreu um erro:', error))

}

const getListarEspecialidades= async () => {
    await fetch(`${baseURL}/medicalSpecialty`).then(response => response.json()).then(data => {
        listaDeEspecialidades = data

        var especialidade = document.getElementById("specialityName")

        listaDeEspecialidades.forEach(element => {
            var optionElement = document.createElement("option");
            optionElement.textContent = element.name;
            optionElement.value = element._id;
            especialidade.appendChild(optionElement)
        });
    }).catch(error => console.error('Ocorreu um erro:', error))
}

const getListarTiposDeClinicas = async () => {
    await fetch(`${baseURL}/clinic`).then(response => response.json()).then(data => {
        listaDeClinicas = data

        var clinicLocal = document.getElementById("clinicLocal")
        

        listaDeClinicas.forEach(element => {
            var optionElement = document.createElement("option");
            optionElement.textContent = element.corporateReason;
            optionElement.value = element._id;
            clinicLocal.appendChild(optionElement)
        });
        
    
    }).catch(error => console.error('Ocorreu um erro:', error))
}

(async () => {
    await getListarEspecialidades();
    await getListarTiposDeClinicas();
})();

