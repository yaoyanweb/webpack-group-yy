/**
 * @desc 根状态管理集
 */
import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions.js';
import mutations from './mutations.js';
import getters from './getters.js';

Vue.use(Vuex);

let state = {
    test:'开箱即用'
};

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
});
