import { salvarDados, encontrarUsuario } from './DB.js';


document.addEventListener('DOMContentLoaded', function () {


    const formLogin = document.getElementById('loginForm');
    const formAdotante = document.getElementById('formAdotante');
    const formOng = document.getElementById('formONG');
    const formVeterinario = document.getElementById('formVeterinario');

    formLogin.addEventListener('submit', function (event) {
        event.preventDefault();
        const formdata = new FormData(formLogin);

        const email = formdata.get('email');
        const senha = formdata.get('senha');

        const usuariosSalvos = encontrarUsuario(email, senha);

        if (email === 'kaykykruger@gmail.com' && senha === '12345') {
            alert('Bem-vindo, SuperUsuário!');
            window.location.href = 'superuser.html';
            return; 
        }

        
        if (usuariosSalvos) {

            localStorage.setItem('usuarioLogado', JSON.stringify(usuariosSalvos));             

            alert('Login realizado com sucesso!');

            console.log("Usuário logado:", usuariosSalvos.tipo);
            console.log("Dados do usuário:", usuariosSalvos.dados);

            if (usuariosSalvos.tipo === 'adotante') {
                window.location.href = 'home.html';
            } else if (usuariosSalvos.tipo === 'ongs'){
                window.location.href = 'dashboard_ong.html';
            } else if (usuariosSalvos.tipo === 'veterinarios') {
                window.location.href = 'home_veterinario.html';
            }
        } else {
            alert('Email ou senha incorretos. Tente novamente.');
        }
    });

    formAdotante.addEventListener('submit', function (event) {
        event.preventDefault();

        const senhaInput = document.getElementById('senhaAdotante');
        const senhaConfirma = document.getElementById('confirmarSenhaAdotante')
        const cpf = document.getElementById('cpfAdotante');
        if (cpf.value.includes('.') || cpf.value.includes('-')) {
            alert('O CPF não deve conter pontos ou traços. Insira apenas números.');
            return;
        }
        if (cpf.value.length != 11) {
            alert('Insira o CPF VALIDO!')
            return;
        }
        if (isNaN(cpf.value)) {
            alert('O CPF deve conter apenas números. Insira um CPF válido.');
            return;
        }
        if (senhaInput.value.length < 6) {
            alert('A senha deve ter no mínimo 6 caracteres.');
            return;
        }
        if (senhaInput.value !== senhaConfirma.value) {
            alert('As Senhas não se conhecidem!');
            return;
        }

        const formdata = new FormData(formAdotante);

        const novoUsuario = {
            "nome": formdata.get('nome'),
            "email": formdata.get('email'),
            "telefone": formdata.get('telefone'),
            "senha": formdata.get('senha'),
            "cpf": formdata.get('cpf'),
            "nascimento": formdata.get('nascimento')
        };

        salvarDados('adotante', novoUsuario);
        alert('Cadastro realizado com sucesso!');
        formAdotante.reset();
    });

    formOng.addEventListener('submit', function (event) {
        event.preventDefault();

        const senhainput = document.getElementById('senhaONG');
        const senhaConfirma = document.getElementById('confirmarSenhaONG');
        const cnpj = document.getElementById('CnpjONG');

        if (cnpj.value.length !== 14) {
            alert('Insira um CNPJ VALIDO!');
            return;
        }
        if (cnpj.value.includes('.') || cnpj.value.includes('-') || cnpj.value.includes('/')) {
            alert('O CNPJ não deve conter pontos, barras ou traços. Insira apenas números.');
            return;
        }
        if (isNaN(cnpj.value)) {
            alert('O CNPJ deve conter apenas números. Insira um CNPJ válido.');
            return;
        }
        if (senhainput.value.length < 8) {
            alert("a senha para ONG's deve conter 8 ou mais digitos");
            return;
        }
        if (senhainput.value !== senhaConfirma.value) {
            alert("As senhas não se conhecidem!!");
            return;
        }

        const formdata = new FormData(formOng);

        const novaOng = {
            "nome": formdata.get('nomeONG'),
            "email": formdata.get('emailONG'),
            "telefone": formdata.get('telefoneONG'),
            "cnpj": formdata.get('cnpjONG'),
            "senha": formdata.get('senhaONG')
        };

        salvarDados('ongs', novaOng);
        alert('Cadastro realizado com sucesso!');
        formOng.reset();
    })

    formVeterinario.addEventListener('submit', function (event) {
        event.preventDefault();

        const senhainput = document.getElementById('senhaVeterinario');
        const senhaConfirma = document.getElementById('confirmarSenhaVeterinario');

        if (senhainput.value !== senhaConfirma.value) {
            alert("As senhas não se conhecidem!")
            return
        }

        const formdata = new FormData(formVeterinario);

        const novoVet = {
            "nome": formdata.get('nomeVeterinario'),
            "email": formdata.get('emailVeterinario'),
            "telefone": formdata.get('telefoneVeterinario'),
            "crmv": formdata.get('crmv'),
            "senha": formdata.get('senhaVeterinario')
        };

        salvarDados('veterinarios', novoVet);
        alert('Cadastro Veterinario realizado com sucesso!')
        formVeterinario.reset();
    })
































    // --- LÓGICA PARA TRANSIÇÃO DE MODAIS DE ESCOLHA DE PERFIL ---

    const authModalEl = document.getElementById('authModal');
    if (authModalEl) {
        const authModal = new bootstrap.Modal(authModalEl);
        const profileChoiceCards = document.querySelectorAll('.profile-choice-card');

        profileChoiceCards.forEach(card => {
            card.addEventListener('click', function () {
                // 1. Pega o ID da próxima modal a ser aberta
                const nextModalId = this.dataset.nextModal;
                const nextModalEl = document.getElementById(nextModalId.substring(1));

                if (nextModalEl) {
                    const nextModal = new bootstrap.Modal(nextModalEl);
                    authModalEl.addEventListener('hidden.bs.modal', function onModalHidden() {
                        nextModal.show();
                        authModalEl.removeEventListener('hidden.bs.modal', onModalHidden);
                    }, { once: true });

                    authModal.hide();
                }
            });
        });
    }
});