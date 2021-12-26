import { ref } from 'vue'


export const useState = (inital=null)=>{
    const state = ref(inital);
    const setState = (val)=>{
        state.value = {
            ...state,
            ...val
        }  
    }
    return [state , setState]
}