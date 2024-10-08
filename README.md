# Sistema de Votação Segura utilizando Blockchain e Criptografia de Ponta a Ponta

#### [Link do Docs](https://docs.google.com/document/d/1v1z3AznJkqIbzZ-HG_4pfEeMJ6N3SbSPzs3yPYBLxGc/edit?usp=sharing).

## Requisitos
- Node.js (versão – 16.17.0)
- Metamask
- Python (versão – 3.10)
- FastAPI
- MySQL (Porta – 3306)

## Instalação

1. Abra um terminal.

2. Clone o repositório usando o comando:

        git clone https://github.com/Leopalds/trabalho-redes

3. Baixe e instale [Ganache](https://trufflesuite.com/ganache/).

4. Crie um workspace chamado **development**. Na seção de projetos do Truffle, adicione o `truffle-config.js` clicando no botão `ADD PROJECT`.

5. Baixe a extensão [Metamask](https://metamask.io/download/) para o navegador.

6. Agora, crie uma carteira (se ainda não tiver uma), e importe as contas do Ganache.

7. Adicione a rede ao Metamask:

        Nome da rede - Localhost 7545
        URL RPC - http://localhost:7545
        ID da cadeia - 1337
        Símbolo da moeda - ETH

Nota: lembre-se de adicionar as contas do Ganache ao Metamask. E adicioná-las a essa rede.

8. Abra o MySQL e crie um banco de dados chamado **voter_db**

9. No banco de dados criado, crie uma nova tabela chamada **voters** no formato dado e adicione alguns valores.

    ```sql
    CREATE TABLE voters (
       voter_id VARCHAR(36) PRIMARY KEY NOT NULL,
       role ENUM('admin', 'user') NOT NULL,
       password VARCHAR(255) NOT NULL,
       voted BOOLEAN DEFAULT FALSE NOT NULL
    );

12. Instale o Truffle globalmente:

        npm install -g truffle

14. Vá até o diretório raiz do repositório e instale os módulos Node:

        npm install

15. Instale as dependências do Python:

        pip install fastapi mysql-connector-python pydantic python-dotenv uvicorn uvicorn[standard] PyJWT

16. Atualize as credenciais do banco de dados no arquivo `./Database_API/.env`, conforme as configurações do seu banco de dados.

## Uso
1. Abra o terminal no diretório do projeto.

2. Abra o Ganache e seu workspace **development**.

3. Abra o terminal no diretório raiz do projeto e execute o comando:

        truffle console

   Em seguida, compile os contratos inteligentes com o comando:

        compile

   Saia do console do Truffle.

5. Empacote o `app.js` e o `results.js` com o Browserify:

        browserify ./src/js/app.js -o ./src/dist/app.bundle.js
        browserify ./src/js/results.js -o ./src/dist/results.bundle.js

6. Inicie o servidor Node:

        node index.js

7. Navegue até a pasta `Database_API` em outro terminal:

        cd Database_API

   Em seguida, inicie o servidor de banco de dados com o comando:

        uvicorn main:app --reload --host 127.0.0.1

8. Em um novo terminal, migre o contrato Truffle para a blockchain local:

        truffle migrate

9. É necessário adicionar um admin no banco de dados para acessar a página de administração. Para isso, insira um admin no banco:

    ```sql
    INSERT INTO voters (voter_id, role, password) VALUES ('admin', 'admin', 'sua-senha-aqui');
Pronto! O aplicativo de votação deve estar funcionando agora em http://localhost:8080/.<br>