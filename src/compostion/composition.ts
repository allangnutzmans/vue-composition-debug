import { ref } from 'vue';
import composableIdentifier from "./composableIdentifier";

// Lista de composables registrados
export const composables = ref<any[]>([]);

// Função de decomposição para registrar o composable
export function decomposition(fn: () => any) {
    const composableData = composableIdentifier(fn);

    // Adiciona o composable à lista de composables
    composables.value.push({
        id: composableData.id,
        label: composableData.id,
        description: JSON.stringify(composableData.state),
    });

    // Emite para o Vue DevTools, se disponível
    if (window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
        const devtools = window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
        devtools.emit('composable-inspector:add', composableData);
    }
}