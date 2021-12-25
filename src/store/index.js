import { createStore } from 'vuex';
import commons from './commons';

const store = createStore({
  modules: {
    commons
  }
})

export default store;
