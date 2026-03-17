export function salvarDados(chave, novosDados) {
    const dadosSalvos = localStorage.getItem(chave);

    const bancoDeDados = dadosSalvos ? JSON.parse(dadosSalvos) : [];

    bancoDeDados.push(novosDados);

    localStorage.setItem(chave, JSON.stringify(bancoDeDados));

    console.log(`Dados salvos com sucesso na chave '${chave}':`, bancoDeDados);
}


function buscarDados(chave) {
    const dadosJSON = localStorage.getItem(chave);
    return dadosJSON ? JSON.parse(dadosJSON) : [];
}

export function encontrarUsuario(email, senha) {

    const tiposDeUsuario = ['adotante', 'ongs', 'veterinarios'];

    for (const tipo of tiposDeUsuario) {
        const bancoDeDados = buscarDados(tipo);
        const usuario = bancoDeDados.find(user => user.email === email && user.senha === senha);

        if (usuario) {
            return { dados: usuario, tipo: tipo };
        }
    }

    return null;
}
