import { ref } from 'vue'
import {decomposition} from "./compostion/composition";

export function useCounter() {
    const count = ref(0)

    const increment = () => {
        count.value++
    }

    const decrement = () => {
        count.value--
    }

    // Track this composable state with Vue DevTools
    //trackComposableState(count, 'useCounter')

    return {
        count,
        increment,
        decrement,
    }
}

decomposition(useCounter);
