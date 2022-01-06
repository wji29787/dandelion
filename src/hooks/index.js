import { ref ,reactive,toRefs ,toRef}  from 'vue'
import { useStore }  from 'vuex'


export const useModeldata = (inital={})=>{
    const formData = ref(inital);
    const visible = ref(false)
    const cancel = ()=>{
        formData.value = inital;
    }
    const open = ()=>{
       visible.value = true;
    
    }
   return {
       visible , formData ,cancel,open
   } 
}

export const useGetLastTime = ()=>{}
