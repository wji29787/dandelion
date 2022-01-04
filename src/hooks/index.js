import { ref ,reactive,toRefs }  from 'vue'
import { useStore }  from 'vuex'


export const useModeldata = (inital={})=>{
    const modelData = reactive({
        visible:false,
        formData:inital
    })
   const { visible ,formData } = toRefs(modelData)
   const cancel = ()=>{
        formData.value = inital;
   }
   return {
       visible , formData ,cancel
   } 
}

export const useGetLastTime = ()=>{}
