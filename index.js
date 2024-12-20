const axios = require('axios');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

// Função para formatar a data
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // meses começam em 0
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // Formato YYYY-MM-DD
}

// Função para gerar a planilha
async function generateSpreadsheet(apiUrl, token, tags) {
    try {
        // Configurando o cabeçalho com o token
        const headers = {
            'apiKey': token// Adicionando o token ao cabeçalho
        };

        // Fazendo a requisição GET à API com o cabeçalho de autenticação
        const response = await axios.get(apiUrl, { headers });
        const data = response.data;

        // Verifica se a resposta da API contém os dados esperados
        if (!data || !data.data || !Array.isArray(data.data.data)) {
            console.error("A resposta da API não contém os dados esperados.");
            return;
        }

        // Filtrando os dados de acordo com as tags especificadas
        const filteredData = data.data.data.map(item => {
            const filteredItem = {};
            tags.forEach(tag => {
                filteredItem[tag] = item[tag] || null; // Adiciona a tag ao objeto, se existir
            });
            return filteredItem;
        });

        // Criando uma nova planilha
        const worksheet = xlsx.utils.json_to_sheet(filteredData);
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Dados');

        // Certificando-se de que o diretório existe
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true }); // Cria o diretório se não existir
        }

        // Incluindo a data atual no nome do arquivo
        const currentDate = formatDate(new Date());
        const fileName = `dados_${currentDate}.xlsx`;
        const filePath = path.join(outputDir, fileName); // Caminho completo do arquivo

        // Salvando a planilha no formato xlsx no diretório
        xlsx.writeFile(workbook, filePath);
        console.log(`Planilha gerada com sucesso: ${filePath}`);
    } catch (error) {
        console.error("Erro ao fazer a requisição ou gerar a planilha:", error.message);
    }
}

// Configurações iniciais
const apiUrl = process.argv[2]; // URL da API passada como argumento
const token = process.argv[3]; // Token passado como argumento
const outputDir = process.argv[4]; // Diretório de saída passado como argumento
const tags = process.argv.slice(5); // Tags passadas como argumentos

// Verifica se a URL da API, o token, o diretório e as tags foram passadas
if (!apiUrl || !token || !outputDir || tags.length === 0) {
    console.log("Uso: node index.js <url da api> <token> <diretorio de saida> <tag1> <tag2> ... <tagN>");
    process.exit(1);
}

// Executando a função
generateSpreadsheet(apiUrl, token, tags, outputDir);