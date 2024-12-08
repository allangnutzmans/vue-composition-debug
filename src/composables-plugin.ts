import { setupDevtoolsPlugin } from '@vue/devtools-api';
import {composables} from "./compostion/composition";
import {keyValueTransform} from "./compostion/keyValueTransform";

// Função para configurar o Vue DevTools e adicionar a aba para composables
export default function setupVueDevTools(app) {
    setupDevtoolsPlugin(
        {
            id: 'composable-inspector',
            label: 'Composable Inspector',
            app,
            enableEarlyProxy: true,
        },
        (api) => {
            // Adiciona uma nova aba no DevTools
            api.addInspector({
                id: 'composable-inspector-tab',
                label: 'Composables',
                icon: 'filter_list', // Ícone do DevTools
            });

            // Preenche a árvore de inspeção com os composables registrados
            api.on.getInspectorTree((payload) => {
                if (payload.inspectorId === 'composable-inspector-tab') {
                    payload.rootNodes = composables.value.map((item) => ({
                        id: item.id,
                        label: item.label,
                        tags: [{ label: item.description, textColor: 0x000000, backgroundColor: 0xf0f0f0 }],
                    }));
                }
            });

            // Preenche o estado da inspeção com os dados dos composables
            api.on.getInspectorState((payload) => {
                if (payload.inspectorId === 'composable-inspector-tab') {
                    const selectedItem = composables.value.find((item) => item.id === payload.nodeId);
                    if (selectedItem) {
                        console.log(selectedItem.description);
                        console.log(keyValueTransform(selectedItem.description))
                        payload.state = {
                            General:
                                [
                                { key: selectedItem.description, value: selectedItem.description },
                            ],
                        };
                    }
                }
            });
        }
    );
}
