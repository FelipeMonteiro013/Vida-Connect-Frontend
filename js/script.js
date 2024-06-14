if (!localStorage.getItem("loggedUserId")) {
    window.location.href = 'index.html';
}


function updateForm() {
    const tipo = document.getElementById('tipo').value;
    const examesFields = document.getElementById('examesFields');
    const consultasFields = document.getElementById('consultasFields');
    
    if (tipo === 'exames') {
        examesFields.classList.remove('hidden');
        consultasFields.classList.add('hidden');
    } else if (tipo === 'consultas') {
        consultasFields.classList.remove('hidden');
        examesFields.classList.add('hidden');
    } else {
        examesFields.classList.add('hidden');
        consultasFields.classList.add('hidden');
    }
}

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

document.getElementById("agendarButton").addEventListener("click", function() {
    var mensagem = document.getElementById("mensagem");
    mensagem.classList.add("mensagem-visivel");
    
    // Opcional: Ocultar a mensagem após alguns segundos
    setTimeout(function() {
        mensagem.classList.remove("mensagem-visivel");
    }, 3000); // A mensagem desaparecerá após 3 segundos
});