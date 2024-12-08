#!/usr/bin/env node
import ollama from 'ollama';
import fs from 'fs';
import path from 'path';

// Caminho para o arquivo index.d.cts
const filePath = '/home/allan/WebstormProjects/compositon/node_modules/@vue/devtools-kit/dist/index.d.cts';

// Lendo o conteúdo do arquivo
fs.readFile(filePath, 'utf8', async (err, data) => {
    if (err) {
        console.error('Erro ao ler o arquivo:', err);
        return;
    }

    const message = ' import { setupDevToolsPlugin, addCustomTab } from \'@vue/devtools-api\';\n' +
        'import icon from \'./assets/img.png?url\'\n' +
        'export function setupVueDevtools(app) {\n' +
        '    setupDevToolsPlugin(\n' +
        '        {\n' +
        '            id: \'composition\', // ID do plugin\n' +
        '            label: \'Composition\', // Nome do plugin\n' +
        '            app,\n' +
        '            enableEarlyProxy: true\n' +
        '        },\n' +
        '        (api) => {\n' +
        '            addCustomTab({\n' +
        '                name: \'composition\',\n' +
        '                title: \'Composition\',\n' +
        '                icon: icon,\n' +
        '                view: {\n' +
        '                    type: \'iframe\',\n' +
        '                    src: \'https://vueuse.org/\',\n' +
        '                },\n' +
        '                category: \'advanced\',\n' +
        '            });\n' +
        '        }\n' +
        '    );\n' +
        '}\n' +
        '\n' +
        '\n' +
        'a partir daqui estou fazendo um clone do pinia devtools, só que apenas a parte do devtools. O arquivo abaixo vai te dar como está organizada a api do vue devtools. me ajude \n +' +
        data;
    // Usando o conteúdo do arquivo como input para o modelo
    try {
        const response = await ollama.chat({
            model: 'llama3.2',
            messages: [{
                role: 'user',
                content: message
            }],
        });

        console.log(response.message.content);
    } catch (error) {
        console.error('Erro ao comunicar com o modelo:', error);
    }
});
