import { ref ,reactive,toRefs }  from 'vue'


export const useModeldata = (inital)=>{
    const modelData = reactive({
        visible:false,
        formData:inital
    })
   const { visible ,formData } = toRefs(modelData)
   const cancle = ()=>{
        visible.value = false;
        formData.value = inital
   }
   return {
       visible , formData ,cancle
   } 
}