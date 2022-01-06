import { createStore } from 'vuex';
import commons from './commons';
import KnowledgeGraph from './KnowledgeGraph';

const getMenus = ()=>{
  
}


const store = createStore({
  modules: {
    commons,
    KnowledgeGraph
  }
})

export default store;
