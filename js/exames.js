

// const baseURL = "http://ec2-44-223-23-150.compute-1.amazonaws.com:3000"
const baseURL = "http://ec2-44-223-23-150.compute-1.amazonaws.com:3000"



if (!localStorage.getItem("loggedUserId")) {
    window.location.href = 'index.html';
}

var lista = [];
var listaDeExames = [];
var listaDeClinicas = [];
var patientId = ""

const getListaExames = async () => {
    await fetch(`${baseURL}/exam`).then(response => response.json()).then(data => {

        lista = data

        // Selecionando o elemento tbody da tabela
        var tabela = document.getElementById("dataTable").getElementsByTagName('tbody')[0];

        // Iterando sobre a lista e inserindo os dados na tabela
        lista.forEach(function (item) {
            // Criando uma nova linha na tabela
            var novaLinha = tabela.insertRow();

            // Criando células e inserindo os valores

            var celulaSymptoms = novaLinha.insertCell(0);
            celulaSymptoms.textContent = item.patient_id.name;

            var celulaSymptoms = novaLinha.insertCell(1);
            celulaSymptoms.textContent = item.type_examination_id.name;

            var celulaMedicalHistory = novaLinha.insertCell(2);
            celulaMedicalHistory.textContent = new Date(item.date).toLocaleString().split(',')[0];

            var celulaMedicalHistory = novaLinha.insertCell(3);
            celulaMedicalHistory.textContent = item.date.substr(11, 5);

            var celulaDate = novaLinha.insertCell(4);
            celulaDate.textContent = item.clinic_id.corporateReason;

            var celulaReason = novaLinha.insertCell(5);
            celulaReason.textContent = item.status;

            var btnConfirmar = document.createElement('button');
            btnConfirmar.className = 'icon-button';
            btnConfirmar.innerHTML = '<i class="fas fa-check"></i>';
            btnConfirmar.addEventListener('click', function () {
                if (confirm("Deseja atualizar o status deste item ?")) {
                    updateExameStatus(item)
                    
                }

            });

            var celulaAcoes = novaLinha.insertCell(6);
            if(item.status == "Pendente"){
                celulaAcoes.appendChild(btnConfirmar);

            }

        });
    }).catch(error => console.error('Ocorreu um erro:', error))
}

const updateExameStatus = async (data) => {

    data.status = "Concluído"

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    await fetch(`${baseURL}/exam/${data._id}`, requestOptions).then(response => response.json()).then(data => {
        
    }).catch(error => console.error('Ocorreu um erro:', error))

    location.reload();  
}

// Função para formatar CPF
function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona ponto após os primeiros 3 dígitos
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona ponto após os próximos 3 dígitos
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona hífen após os últimos 3 dígitos
    return cpf;
}

var inputDocumento = document.getElementById("documento");

// Adicionando um ouvinte de eventos para o evento "input"
inputDocumento.addEventListener("input", function () {

    // Obtendo o valor atual do input
    var valorAtual = inputDocumento.value;

    // Formatando o valor do CPF
    var cpfFormatado = formatarCPF(valorAtual);

    // Definindo o valor formatado de volta no input
    inputDocumento.value = cpfFormatado;

    getPacientePorDocumento(inputDocumento.value)
});



const getPacientePorDocumento = async (id, type) => {
    await fetch(`${baseURL}/patient/${id}`).then(response => response.json()).then(data => {
        if (data) {
            if (type == "consulta") {
                var consultaName = document.getElementById("consultaName")
                consultaName.value = data.name
                consultaName.disabled = true;

                var consultaDataNascimento = document.getElementById("consultaDataNascimento")
                consultaDataNascimento.value = data.dt_nasc.split("T")[0]
                consultaDataNascimento.disabled = true;

                var consultaEmail = document.getElementById("consultaEmail")
                consultaEmail.value = data.email
                consultaEmail.disabled = true;
            } else {
                var exameName = document.getElementById("exameName")
                exameName.value = data.name
                exameName.disabled = true;

                var exameDataNascimento = document.getElementById("exameDataNascimento")
                exameDataNascimento.value = data.dt_nasc.split("T")[0]
                exameDataNascimento.disabled = true;

                var exameEmail = document.getElementById("exameEmail")
                exameEmail.value = data.email
                exameEmail.disabled = true;
            }
            patientId = data._id
        }
    }).catch(error => console.error('Ocorreu um erro:', error))
}

const getListarTiposDeExames = async () => {
    await fetch(`${baseURL}/typeMedicalExamination`).then(response => response.json()).then(data => {
        listaDeExames = data

        var exameTipo = document.getElementById("exameTipo")

        listaDeExames.forEach(element => {
            var optionElement = document.createElement("option");
            optionElement.textContent = element.name;
            optionElement.value = element._id;
            exameTipo.appendChild(optionElement)
        });
    }).catch(error => console.error('Ocorreu um erro:', error))
}


const getListarTiposDeClinicas = async () => {
    await fetch(`${baseURL}/clinic`).then(response => response.json()).then(data => {
        listaDeClinicas = data

        var exameClinica = document.getElementById("exameClinica")
        var consultaLocal = document.getElementById("consultaLocal")

        listaDeClinicas.forEach(element => {
            var optionElement = document.createElement("option");
            optionElement.textContent = element.corporateReason;
            optionElement.value = element._id;
            exameClinica.appendChild(optionElement)
        });
        
        listaDeClinicas.forEach(element => {
            var optionElement = document.createElement("option");
            optionElement.textContent = element.corporateReason;
            optionElement.value = element._id;
            consultaLocal.appendChild(optionElement)
        });
    }).catch(error => console.error('Ocorreu um erro:', error))
}

//INICIO CADASTRO
// Selecionando o formulário pelo ID
var formElement = document.getElementById("examForm");

// Adicionando um ouvinte de eventos para o evento "submit" do formulário
formElement.addEventListener("submit", function (event) {
    // Prevenir o envio padrão do formulário
    event.preventDefault();

    // Obtendo os valores dos inputs
    var documento = document.getElementById("documento").value;
    var tipoExame = document.getElementById("exameTipo").value;
    var localExame = document.getElementById("exameClinica").value;
    var dataExame = document.getElementById("exameData").value;
    var exameHorario = document.getElementById("exameHorario").value;

    if (documento, tipoExame, localExame, dataExame, exameHorario) {
        var data = {
            patient_id: patientId,
            type_examination_id: tipoExame,
            clinic_id: localExame,
            date: `${dataExame}T${exameHorario}:00.000Z`,
            status: "Pendente"
        }
        cadastrarExame(data)
    }
});


const cadastrarExame = async (data) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    await fetch(`${baseURL}/exam`, requestOptions).then(response => response.json()).then(data => {
        location.reload();
    }).catch(error => console.error('Ocorreu um erro:', error))
}

// ************************************************ CONSULTAS ********************************************************

var listaConsul = [];
var listaDeConsultas = [];
var listaDeClinicas = [];
var listaDeMedicos = [];
var patientId = ""

const getListaDeConsultas = async () => {
    await fetch(`${baseURL}/medicalAppointment`).then(response => response.json()).then(data => {
        listaConsul = data
        var tabelaConsulta = document.getElementById("dataTableConsul")
        listaConsul.forEach(function (item) {
            var novaLinha = tabelaConsulta.insertRow()
            //preencher as colunas da tabela
            var colunaPaciente = novaLinha.insertCell(0)
            colunaPaciente.textContent = item.patient_id.name
            var colunaLocal = novaLinha.insertCell(1)
            colunaLocal.textContent = item.reason
            var colunaLocal = novaLinha.insertCell(2)
            colunaLocal.textContent = item.clinic_id.corporateReason
            var colunaData = novaLinha.insertCell(3)
            colunaData.textContent = new Date(item.date).toLocaleString().split(",")[0]
            var colunaHorario = novaLinha.insertCell(4)
            colunaHorario.textContent = item.date.substr(11, 5)
            var colunaMedico = novaLinha.insertCell(5)
            colunaMedico.textContent = item.doctor_id.name
            var colunaStatus = novaLinha.insertCell(6)
            colunaStatus.textContent = item.status

            var btnConfirmar = document.createElement('button');
            btnConfirmar.className = 'icon-button';
            btnConfirmar.innerHTML = '<i class="fas fa-check"></i>';
            btnConfirmar.addEventListener('click', function () {
                if (confirm("Deseja atualizar o status deste item ?")) {
                    updateConsultaStatus(item)
                    
                }

            });

            var colunaAcoes = novaLinha.insertCell(7);
            if(item.status == "Pendente"){
                colunaAcoes.appendChild(btnConfirmar);

            }
        })
    })
}

var inputDocumentoConsulta = document.getElementById("documentoConsulta")
inputDocumentoConsulta.addEventListener("input", function () {
    var valorAtual = inputDocumentoConsulta.value
    var cpfFormatado = formatarCPF(valorAtual)
    inputDocumentoConsulta.value = cpfFormatado
    getPacientePorDocumento(inputDocumentoConsulta.value, "consulta")
})

const getListarMedicos = async () => {
    await fetch(`${baseURL}/doctor`).then(response => response.json()).then(data => {
        listaDeMedicos = data
        var consultaMedico = document.getElementById("consultaMedico")

        listaDeMedicos.forEach(element => {
            var optionElement = document.createElement("option");
            optionElement.textContent = element.name;
            optionElement.value = element._id;
            consultaMedico.appendChild(optionElement)
        });
    }).catch(error => console.error('Ocorreu um erro:', error))
}

var consultaForm = document.getElementById("consultaForm")

consultaForm.addEventListener("submit", function (event) {
    event.preventDefault()

    var sintomas = document.getElementById("sintomas").value
    var data = document.getElementById("consultaData").value
    var horario = document.getElementById("consultaHorario").value
    var medico = document.getElementById("consultaMedico").value
    var local = document.getElementById("consultaLocal").value
    var motivo = document.getElementById("consultaMotivo").value

    if (sintomas, data, horario, medico, local, motivo) {
        var data = {
            symptoms: sintomas,
            date: `${data}T${horario}:00.000Z`,
            reason: motivo,
            patient_id: patientId,
            clinic_id: local,
            doctor_id: medico,
            status: "Pendente"
        }
        cadastrarConsulta(data)
    }

})

const cadastrarConsulta = async (data) => {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    await fetch(`${baseURL}/medicalAppointment`, requestOptions).then(response => response.json()).then(data => {
        location.reload();
    }).catch(error => console.error('Ocorreu um erro:', error))

}

const updateConsultaStatus = async (data) => {

    data.status = "Concluído"

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    await fetch(`${baseURL}/medicalAppointment/${data._id}`, requestOptions).then(response => response.json()).then(data => {
        
    }).catch(error => console.error('Ocorreu um erro:', error))
    
    location.reload();  
}



// ************************************************ Clinicas ********************************************************




getListaDeConsultas()
getListarMedicos()
getListaExames()
getListarTiposDeExames()
getListarTiposDeClinicas()


