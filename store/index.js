import Vue from 'vue'
import Vuex from 'vuex'
import {actions} from './actions';
import {state, mutations} from './mutations'
import plugins from './plugins'

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    actions,
    mutations,
    plugins
})
