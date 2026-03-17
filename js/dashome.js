
document.addEventListener('DOMContentLoaded', function() {
    const usuarioLogadoJSON = localStorage.getItem('usuarioLogado');

    if (!usuarioLogadoJSON) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = 'index.html'; 
        return; 
    }

    const usuarioLogado = JSON.parse(usuarioLogadoJSON);
    const spanNomeUsuario = document.getElementById('adotante-name');

    if (spanNomeUsuario) {
        spanNomeUsuario.textContent = `Olá, ${usuarioLogado.dados.nome}!`;
    }

    const botaoSair = document.getElementById('btn-sair');

    if (botaoSair) {
        botaoSair.addEventListener('click', function(event) {
            event.preventDefault();

            localStorage.removeItem('usuarioLogado');

            alert('Você saiu da sua conta com segurança.');
            window.location.href = 'index.html';
        });
    }
});