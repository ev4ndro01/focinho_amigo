# 🐾 Plataforma de Adoção e Rede de Apoio Animal

> Um sistema web completo para conectar animais que precisam de um lar a adotantes, ONGs e médicos veterinários voluntários.

💻 Sobre o Projeto

Este projeto foi desenvolvido em equipe durante o meu segundo semestre letivo com o objetivo principal de colocar em prática os conceitos de Desenvolvimento Web (Front-end e Back-end). 

A plataforma vai além de um simples site de adoção: ela cria um ecossistema de cuidado animal. Identificamos a necessidade de conectar não apenas quem quer adotar, mas também quem atua na linha de frente do resgate e tratamento.

🚀 Funcionalidades Principais

O sistema possui diferentes áreas de acesso, dependendo do perfil do usuário:
**Usuário Adotante:** Pode visualizar os animais disponíveis, favoritar e entrar em contato para iniciar o processo de adoção.
**ONG Voluntária:** Possui uma área para gerenciar o recolhimento de animais de rua, cadastrá-los no sistema e atualizar seus status.
**Veterinário Voluntário:** Pode se cadastrar na plataforma para oferecer consultas e tratamentos gratuitos ou a baixo custo para os animais resgatados pelas ONGs.

🛠 Tecnologias Utilizadas

Para a construção deste projeto, utilizamos a seguinte stack:

**Front-end:** HTML5, CSS3, JavaScript
**Back-end:** PHP
**Banco de Dados:** MySQL
**Ambiente de Desenvolvimento:** XAMPP

⚙️ Como rodar o projeto localmente

Se você quiser baixar e testar o projeto na sua máquina, siga os passos abaixo:

Pré-requisitos
* Ter o [XAMPP](https://www.apachefriends.org/pt_br/index.html) (ou WAMP/MAMP) instalado na sua máquina.

Passo a passo

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/SeuUsuario/nome-do-repositorio.git](https://github.com/SeuUsuario/nome-do-repositorio.git)


2. Mova os arquivos:
Coloque a pasta do projeto dentro do diretório htdocs do seu XAMPP (geralmente em C:\xampp\htdocs\).

3. Inicie os serviços:
Abra o painel de controle do XAMPP e inicie os módulos Apache e MySQL.

4. Configure o Banco de Dados:

Acesse o phpMyAdmin pelo navegador: http://localhost/phpmyadmin/

Crie um novo banco de dados (ex: adocao_animais_db).

Importe o arquivo .sql (disponível na pasta database deste projeto) para criar as tabelas necessárias.

5. Acesse a aplicação:
Abra o seu navegador e digite: http://localhost/nome-da-pasta-do-projeto

📚 O que aprendemos
Este projeto foi fundamental para consolidar nosso conhecimento em:

Estruturação de páginas dinâmicas.

Integração entre o front-end (interfaces) e o back-end (regras de negócio).

Modelagem de banco de dados relacional e execução de queries (CRUD).

Trabalho em equipe e versionamento de código.
