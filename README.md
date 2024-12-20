# API to XLSX Generator

Este projeto é uma aplicação Node.js que permite consultar uma API e gerar uma planilha no formato XLSX com os dados retornados. A aplicação pode ser executada a partir da linha de comando e permite especificar quais tags do JSON retornado pela API devem ser incluídas na planilha gerada.

## Funcionalidade

- Realiza uma requisição GET a uma API que requer autenticação via token.
- Filtra os dados retornados com base nas tags especificadas pelo usuário.
- Gera um arquivo XLSX com os dados filtrados.
- Salva o arquivo gerado na pasta de Documentos do usuário, com o nome formatado para incluir a data atual.

## Pré-requisitos

Antes de executar o projeto, você precisará ter o Node.js instalado em sua máquina. Você pode baixar e instalar o Node.js [aqui](https://nodejs.org/).

## Instalação

1. Clone o repositório ou baixe os arquivos do projeto:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd api-to-xlsx

2. Instale as dependências necessárias: 
   ```bash
   npm install axios xlsx

## Uso

Para usar a aplicação, você deve executar o script index.js passando a URL da API, o token de autenticação e as tags que deseja incluir na planilha.
   ```bash
   node index.js <url da api> <token> <tag1> <tag2> ... <tagN>

## Estrutura do Arquivo Gerado

O arquivo gerado será salvo na pasta de Documentos do usuário com o nome no formato dados_YYYY-MM-DD.xlsx, onde YYYY-MM-DD representa a data em que o arquivo foi gerado