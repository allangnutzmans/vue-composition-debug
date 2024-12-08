import { isRef, isReactive, toRaw } from 'vue';

/**
 * Identifica e retorna detalhes de um composable.
 * @param {Function} fn - Composable a ser analisado.
 * @returns {Object} Detalhes do composable.
 */
export default function composableIdentifier(fn: () => any) {
    if (typeof fn !== 'function') {
        throw new Error('O argumento deve ser uma função representando um composable.');
    }

    // Nome da função passada como identificador
    const id = fn.name || 'anonymous_composable';

    // Executa o composable para obter seu retorno
    const result = fn();

    // Recupera o caminho do arquivo onde a função foi definida
    const filePath = (import.meta.url && new URL(import.meta.url).pathname) || '';

    const state: Record<string, any> = {};
    const functions: Record<string, Function> = {};

    // Itera sobre todas as propriedades retornadas pelo composable
    for (const key in result) {
        const value = result[key];

        if (isRef(value)) {
            // Se for um `ref`, armazena o valor atual
            state[key] = value.value;
        } else if (isReactive(value)) {
            // Se for reativo, armazena uma versão "desenrolada" do objeto
            state[key] = toRaw(value);
        } else if (typeof value === 'function') {
            // Se for uma função, adiciona o caminho do arquivo ao nome
            const functionKey = filePath ? `${key} (${filePath})` : key;
            functions[functionKey] = value;
        } else {
            // Qualquer outro valor é adicionado diretamente
            state[key] = value;
        }
    }

    console.log(result, {
        id,
        state,
        functions,
    })

    return {
        id,
        state,
        functions,
    };
}
