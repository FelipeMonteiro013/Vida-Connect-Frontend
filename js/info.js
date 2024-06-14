// const baseURL = "http://ec2-44-223-23-150.compute-1.amazonaws.com:3000"
// import {baseURL} from "./config"

const baseURL = "http://ec2-44-223-23-150.compute-1.amazonaws.com:3000"

if (!localStorage.getItem("loggedUserId")) {
    window.location.href = 'index.html';
}


const getListarClinicas = async () => {
    await fetch(`${baseURL}/clinic`).then(response => response.json()).then(data => {
        listaDeClinicas = data
                      
        var tabelaClinicas = document.getElementById("dataTableClinica")

        listaDeClinicas.forEach(function (item) {            

            var novaLinha = tabelaClinicas.insertRow()

            var colunaRazaoSocial = novaLinha.insertCell(0)
            colunaRazaoSocial.textContent = item.corporateReason
            var colunaNome = novaLinha.insertCell(1)
            colunaNome.textContent = item.cnpj
            var colunaEndereco = novaLinha.insertCell(2)
            colunaEndereco.textContent = item.address
            var colunaTelefone = novaLinha.insertCell(3)
            colunaTelefone.textContent = item.phone
            var colunaEmail = novaLinha.insertCell(4)
            colunaEmail.textContent = item.email
            var colunaStatus = novaLinha.insertCell(5)
            colunaStatus.textContent = item.status == true ? "Ativa" :  "Inativa"
        })
    }).catch(error => console.error('Ocorreu um erro:', error))
}

const getListarMedicos = async () => {
    await fetch(`${baseURL}/doctor`).then(response => response.json()).then(data => {
        listaDeMedicos = data
                      
        var tabelaMedicos = document.getElementById("dataTableMedico")

        listaDeMedicos.forEach(function (item) {            

            var novaLinha = tabelaMedicos.insertRow()

            var colunaCrm = novaLinha.insertCell(0)
            colunaCrm.textContent = item.crm
            var colunaNome = novaLinha.insertCell(1)
            colunaNome.textContent = item.name
            var colunaEspecialidade = novaLinha.insertCell(2)
            colunaEspecialidade.textContent = item.specialty_id.name
            var colunaEmail = novaLinha.insertCell(3)
            colunaEmail.textContent = item.email
            var colunaTelefone = novaLinha.insertCell(4)
            colunaTelefone.textContent = item.phone
            var colunaClinica = novaLinha.insertCell(5)
            colunaClinica.textContent = item.clinic_id.corporateReason
            var colunaStatus = novaLinha.insertCell(6)
            colunaStatus.textContent = item.status == true ? "Ativo" :  "Inativo"
        })
    }).catch(error => console.error('Ocorreu um erro:', error))
}

const getListarPacientes = async () => {
    await fetch(`${baseURL}/patient`).then(response => response.json()).then(data => {
        listaDePacientes = data
                      
        var tabelaPacientes = document.getElementById("dataTablePaciente")

        listaDePacientes.forEach(function (item) {            

            var novaLinha = tabelaPacientes.insertRow()

            var colunaNome = novaLinha.insertCell(0)
            colunaNome.textContent = item.name
            var colunaEmail = novaLinha.insertCell(1)
            colunaEmail.textContent = item.email
            var colunaDataNascimento = novaLinha.insertCell(2)
            colunaDataNascimento.textContent =  new Date(item.dt_nasc).toLocaleString().split(',')[0];
            var colunaDocument = novaLinha.insertCell(3)
            colunaDocument.textContent = item.document           
        })
    }).catch(error => console.error('Ocorreu um erro:', error))
}

getListarClinicas()
getListarMedicos()
getListarPacientes()