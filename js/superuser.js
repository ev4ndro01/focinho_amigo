document.addEventListener('DOMContentLoaded', () => {
    const userTypes = {
        adotante: {
            body: document.getElementById('adotantes-body'),
            fields: ['nome', 'email', 'telefone', 'cpf', 'nascimento']
        },
        ongs: {
            body: document.getElementById('ongs-body'),
            fields: ['nome', 'email', 'telefone', 'cnpj']
        },
        veterinarios: {
            body: document.getElementById('veterinarios-body'),
            fields: ['nome', 'email', 'telefone', 'crmv']
        }
    };

    const editModal = new bootstrap.Modal(document.getElementById('editUserModal'));
    const editForm = document.getElementById('editUserForm');
    const editModalLabel = document.getElementById('editModalLabel');

    function renderTables() {
        for (const type in userTypes) {
            const config = userTypes[type];
            const data = JSON.parse(localStorage.getItem(type)) || [];
            config.body.innerHTML = ''; // Limpa a tabela antes de renderizar

            data.forEach((user, index) => {
                const row = document.createElement('tr');''

                // Preenche as células com os dados do usuário
                config.fields.forEach(field => {
                    const cell = document.createElement('td');
                    cell.textContent = user[field] || 'N/A';
                    row.appendChild(cell);
                });

                // Adiciona a célula de ações (Editar/Excluir)
                const actionsCell = document.createElement('td');
                actionsCell.innerHTML = `
                    <button class="btn btn-primary btn-sm btn-edit" data-type="${type}" data-index="${index}">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn btn-danger btn-sm btn-delete" data-type="${type}" data-index="${index}">
                        <i class="fas fa-trash"></i> Excluir
                    </button>
                `;
                row.appendChild(actionsCell);
                config.body.appendChild(row);
            });
        }
    }

    // Função para deletar um usuário
    function deleteUser(type, index) {
        if (confirm(`Tem certeza que deseja excluir este ${type}?`)) {
            const data = JSON.parse(localStorage.getItem(type)) || [];
            data.splice(index, 1);
            localStorage.setItem(type, JSON.stringify(data));
            renderTables(); // Re-renderiza as tabelas para refletir a mudança
        }
    }

    // Função para abrir o modal de edição
    function openEditModal(type, index) {
        const data = JSON.parse(localStorage.getItem(type)) || [];
        const user = data[index];
        const config = userTypes[type];
        
        editModalLabel.textContent = `Editar ${type.charAt(0).toUpperCase() + type.slice(1)}`;
        editForm.innerHTML = ''; // Limpa o formulário anterior

        config.fields.forEach(field => {
            editForm.innerHTML += `
                <div class="mb-3">
                    <label for="edit-${field}" class="form-label">${field.charAt(0).toUpperCase() + field.slice(1)}</label>
                    <input type="text" class="form-control" id="edit-${field}" value="${user[field] || ''}">
                </div>
            `;
        });
        
        // Armazena o tipo e índice no formulário para saber quem salvar
        editForm.dataset.type = type;
        editForm.dataset.index = index;

        editModal.show();
    }
    
    // Event listener para o formulário de edição
    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const { type, index } = e.target.dataset;
        const data = JSON.parse(localStorage.getItem(type)) || [];
        const userToUpdate = data[index];
        const config = userTypes[type];
        
        // Atualiza os dados do usuário com os valores do formulário
        config.fields.forEach(field => {
            const input = document.getElementById(`edit-${field}`);
            userToUpdate[field] = input.value;
        });
        
        localStorage.setItem(type, JSON.stringify(data));
        editModal.hide();
        renderTables();
    });

    // Event Delegation para os botões de ação
    document.body.addEventListener('click', (e) => {
        const button = e.target.closest('button');
        if (!button) return;

        if (button.classList.contains('btn-delete')) {
            const { type, index } = button.dataset;
            deleteUser(type, parseInt(index));
        }

        if (button.classList.contains('btn-edit')) {
            const { type, index } = button.dataset;
            openEditModal(type, parseInt(index));
        }
    });
    
    // Listener para o evento 'storage', que atualiza a página se o localStorage mudar em outra aba
    window.addEventListener('storage', () => {
        console.log('localStorage foi atualizado em outra aba. Recarregando tabelas...');
        renderTables();
    });

    // Renderização inicial
    renderTables();
});